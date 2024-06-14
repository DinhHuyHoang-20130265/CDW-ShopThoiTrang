package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateOrderRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.OrderDetailRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusHistoryService;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Set;
import java.util.stream.Stream;

import static org.springframework.http.HttpStatus.EXPECTATION_FAILED;

@Service
public class OrderServiceImpl implements OrderService {
    private static final Logger Log = Logger.getLogger(OrderServiceImpl.class.getName());

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderStatusHistoryRepository orderStatusHistoryRepository;

    @Autowired
    private OrderStatusHistoryService orderStatusHistoryService;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private VariationRepository variationRepository;
    @Autowired
    private CouponRepository couponRepository;


    @Override
    public Page<Order> getAllOrders(String filter, int page, int perPage, String sortBy, String order) {
        try {
            Sort.Direction direction = Sort.Direction.ASC;
            if (order.equalsIgnoreCase("DESC"))
                direction = Sort.Direction.DESC;

            JsonNode filterJson;
            try {
                filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            Specification<Order> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("q")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
                }
                if (filterJson.has("price_lt") || filterJson.has("price_gt")) {
                    double priceLt = filterJson.has("price_lt") ? filterJson.get("price_lt").asDouble() : Double.MAX_VALUE;
                    double priceGt = filterJson.has("price_gt") ? filterJson.get("price_gt").asDouble() : 0;
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.between(root.get("totalAmount"), priceGt, priceLt));
                }
                if (filterJson.has("statusId")) {
                    Join<Order, OrderStatus> statusJoin = root.join("status");
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(statusJoin.get("id"), filterJson.get("statusId").asLong()));
                }
                if (filterJson.has("date_gte")) {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                    try {
                        java.util.Date date = dateFormat.parse(filterJson.get("date_gte").asText());
                        Timestamp dateGte = new Timestamp(date.getTime());
                        predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("orderDate"), dateGte));
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                }
                return predicate;
            };

            if (sortBy.equals("price")) {
                return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "totalAmount")));
            }
            if (sortBy.equals("OrderDate")) {
                return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "orderDate")));
            }

            return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
        } catch (RuntimeException e) {
            Log.error("Error in getAllOrders: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public Order getOrderById(Long id) {
        try {
            return orderRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error in getOrderById: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @Override
    public ResponseEntity<?> createOrder(CreateOrderRequest order) {
        try {
            Order orderNew = new Order();

            // set information for order
            orderNew.setGenerated_order_id(order.getId());
            orderNew.setName(order.getName());
            orderNew.setPhone(order.getPhone());
            orderNew.setNote(order.getNote());
            orderNew.setTotalAmount(order.getTotalAmount());
            orderNew.setOrderDate(new Timestamp(System.currentTimeMillis()));
            if (order.getCoupon() != null && !order.getCoupon().isEmpty()) {
                Coupon coupon = couponRepository.findByCouponCode(order.getCoupon()).orElseThrow(() -> new RuntimeException("Coupon not found"));
                orderNew.setCoupon(coupon);
                coupon.setQuantity(coupon.getQuantity() - 1);
                couponRepository.save(coupon);

            }

            // set shipping information for order
            orderNew.setProvince(order.getProvince());
            orderNew.setDistrict(order.getDistrict());
            orderNew.setWard(order.getWard());
            orderNew.setAddress(order.getAddress());
            orderNew.setShippingFee(order.getShippingFee());
            orderNew.setShippingCode(order.getShippingCode());

            // set user for order
            orderNew.setUser(userRepository.findById(order.getUser_id()).orElseThrow(() -> new RuntimeException("User not found")));

            // set status for order
            OrderStatus orderStatus = orderStatusRepository.findById(Long.parseLong(order.getStatus())).orElseThrow(() -> new RuntimeException("Order status not found"));
            orderNew.setStatus(orderStatus);

            // set payment information for order
            orderNew.setPaymentMethod(order.getPaymentMethod());
            orderNew.setPaymentCode((order.getPaymentCode() == null || order.getPaymentCode().isEmpty()) ? null : order.getPaymentCode());
            orderNew.setPaymentStatus(order.getPaymentStatus());
            orderNew.setPaymentDate((order.getPaymentDate() == null || order.getPaymentDate().isEmpty()) ? null : Timestamp.valueOf(order.getPaymentDate()));

            // save order
            Order savedOrder = orderRepository.save(orderNew);

            // save order details
            for (OrderDetailRequest orderDetail : order.getOrderDetails()) {
                OrderDetail newOrderDetail = new OrderDetail();
                newOrderDetail.setProductId(productRepository.findById(orderDetail.getId()).orElseThrow(() -> new RuntimeException("Product not found")));
                newOrderDetail.setVariation(variationRepository.findById(orderDetail.getVariation_id()).orElseThrow(() -> new RuntimeException("Variation not found")));
                newOrderDetail.setSize(sizeRepository.findById(orderDetail.getSizes_id()).orElseThrow(() -> new RuntimeException("Size not found")));
                newOrderDetail.setPrice(orderDetail.getPrice());
                newOrderDetail.setQuantity(orderDetail.getQuantity());
                newOrderDetail.setOrder(savedOrder);
                orderDetailRepository.save(newOrderDetail);
            }

            // update stock
            for (OrderDetailRequest orderDetail : order.getOrderDetails()) {
                Size size = sizeRepository.findById(orderDetail.getSizes_id()).orElseThrow(() -> new RuntimeException("Size not found"));
                if (size.getStock() < orderDetail.getQuantity()) {
                    return ResponseEntity.status(EXPECTATION_FAILED).body("Not enough stock");
                }
                size.setStock(size.getStock() - orderDetail.getQuantity());
                sizeRepository.save(size);
            }

            // save order status history after saving the order
            OrderStatusHistory orderStatusHistory = new OrderStatusHistory();
            orderStatusHistory.setOrder(savedOrder);
            orderStatusHistory.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            orderStatusHistory.setStatus(orderStatus);
            orderStatusHistoryService.saveOrderStatusHistory(orderStatusHistory);
            Log.info(savedOrder.getUser().getUsername() + " ordered successfully with order id: " + savedOrder.getId());
            return ResponseEntity.ok("Order created successfully");
        } catch (RuntimeException e) {
            Log.error("Error in createOrder: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateOrderStatus(Long orderId, Long orderStatusId) {
        try {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
            OrderStatus orderStatus = orderStatusRepository.findById(orderStatusId).orElseThrow(() -> new RuntimeException("Order status not found"));
            order.setStatus(orderStatus);
            Order savedOrder = orderRepository.save(order);

            if (savedOrder != null) {
                OrderStatusHistory orderStatusHistory = new OrderStatusHistory();
                orderStatusHistory.setOrder(order);
                orderStatusHistory.setCreatedDate(new Timestamp(System.currentTimeMillis()));
                orderStatusHistory.setStatus(orderStatus);
                orderStatusHistoryService.saveOrderStatusHistory(orderStatusHistory);
                Log.info("Order status updated successfully for order id: " + orderId + " to status: " + orderStatus.getName());
                return ResponseEntity.ok("Order status updated successfully");
            } else {
                return ResponseEntity.badRequest().body("Order status update failed");
            }
        } catch (RuntimeException e) {
            Log.error("Error in updateOrderStatus: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<?> exportOrder(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
            Set<OrderDetail> orderDetails = order.getOrderDetails();

            Document document = new Document();
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            try {
                PdfWriter writer = PdfWriter.getInstance(document, byteArrayOutputStream);
                document.open();

                BaseFont bf = BaseFont.createFont("src/main/java/vn/edu/hcmuaf/cdw/ShopThoiTrang/font/arial.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                Font boldFont = new Font(bf, 20, Font.BOLD);
                Font regularFont = new Font(bf, 12, Font.NORMAL);

                Paragraph title = new Paragraph("Hóa đơn #" + orderId, boldFont);
                title.setAlignment(Element.ALIGN_CENTER);
                document.add(title);

                // Add barcode
                Barcode128 barcode = new Barcode128();
                barcode.setCode(orderId.toString());
                Image barcodeImage = barcode.createImageWithBarcode(writer.getDirectContent(), BaseColor.BLACK, BaseColor.BLACK);
                barcodeImage.scalePercent(100);
                barcodeImage.setAlignment(Image.ALIGN_RIGHT);
                float top = document.top();
                barcodeImage.setAbsolutePosition(document.right() - barcodeImage.getScaledWidth(), top - barcodeImage.getScaledHeight());
                document.add(barcodeImage);

                document.add(Chunk.NEWLINE);

                PdfPTable tableInfo = new PdfPTable(2);
                tableInfo.setWidthPercentage(100);
                tableInfo.setWidths(new int[]{1, 1});


                tableInfo.addCell(new PdfPCell(new Phrase("Khách hàng", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getName(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Số điện thoại", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getPhone(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Địa chỉ", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getAddress(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Ghi chú", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getNote(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Ngày đặt hàng", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getOrderDate().toString(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Phương thức thanh toán", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getPaymentMethod(), regularFont)));

                tableInfo.addCell(new PdfPCell(new Phrase("Trạng thái thanh toán", regularFont)));
                tableInfo.addCell(new PdfPCell(new Phrase(order.getPaymentStatus(), regularFont)));

                document.add(tableInfo);

                document.add(Chunk.NEWLINE);

                // Add table for order details
                PdfPTable table = new PdfPTable(4);
                table.setWidthPercentage(100);
                table.setWidths(new int[]{1, 3, 1, 1});

                // Add table headers
                addTableHeader(table, regularFont);

                // Add table rows
                int count = 1;
                for (OrderDetail orderDetail : orderDetails) {
                    table.addCell(new PdfPCell(new Phrase(String.valueOf(count++), regularFont)));
                    table.addCell(new PdfPCell(new Phrase(orderDetail.getProductId().getName() + " / (" + orderDetail.getVariation().getColor() + " / " + orderDetail.getSize().getSize() + ")", regularFont)));
                    table.addCell(new PdfPCell(new Phrase(String.valueOf(orderDetail.getQuantity()), regularFont)));
                    table.addCell(new PdfPCell(new Phrase(String.valueOf(formatPrice(orderDetail.getPrice())), regularFont)));
                }

                PdfPCell cellTotal1 = new PdfPCell(new Phrase("Tạm tính", regularFont));
                cellTotal1.setColspan(3);
                table.addCell(cellTotal1);

                PdfPCell cellTotal2 = new PdfPCell(new Phrase(String.valueOf(formatPrice(order.getTotalAmount())), regularFont));
                table.addCell(cellTotal2);

                PdfPCell cellShippingFee = new PdfPCell(new Phrase("Phí vận chuyển", regularFont));
                cellShippingFee.setColspan(3);
                table.addCell(cellShippingFee);

                PdfPCell cellShippingFeeValue = new PdfPCell(new Phrase(String.valueOf(formatPrice(order.getShippingFee())), regularFont));
                table.addCell(cellShippingFeeValue);

                PdfPCell cellTotal = new PdfPCell(new Phrase("Tổng tiền", new Font(bf, 16, Font.BOLD)));
                cellTotal.setColspan(3);
                table.addCell(cellTotal);

                PdfPCell cellTotalValue = new PdfPCell(new Phrase(String.valueOf(formatPrice(order.getTotalAmount() + order.getShippingFee())), new Font(bf, 16, Font.BOLD)));
                table.addCell(cellTotalValue);

                document.add(table);

                document.close();
            } catch (Exception e) {
                Log.error("Error in exportOrder: " + e.getMessage());
                throw new RuntimeException(e);
            }
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order_" + orderId + ".pdf");

            Log.info("Order exported successfully with order id: " + orderId);
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(new ByteArrayResource(byteArrayOutputStream.toByteArray()));
        } catch (RuntimeException e) {
            Log.error("Error in exportOrder: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private void addTableHeader(PdfPTable table, Font font) {
        Stream.of("#", "Tên sản phẩm", "Số lượng", "Giá").forEach(columnTitle -> {
            PdfPCell header = new PdfPCell();
            header.setBackgroundColor(BaseColor.LIGHT_GRAY);
            header.setBorderWidth(2);
            header.setPhrase(new Phrase(columnTitle, font));
            table.addCell(header);
        });
    }

    private String formatPrice(double price) {
        return String.format("%,.0f", price);
    }

}
