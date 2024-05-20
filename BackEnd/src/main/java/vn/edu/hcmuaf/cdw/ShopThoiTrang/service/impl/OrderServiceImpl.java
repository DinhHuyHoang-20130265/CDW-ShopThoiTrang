package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateOrderRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.OrderDetailRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderDetailService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusHistoryService;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Set;
import java.util.stream.Stream;

@Service
public class OrderServiceImpl implements OrderService {

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


    @Override
    public Page<Order> getAllOrders(String filter, int page, int perPage, String sortBy, String order) {
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
            return predicate;
        };

        if (sortBy.equals("price")) {
            return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "totalAmount")));
        }

        return orderRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy)));
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public String createOrder(CreateOrderRequest order) {
        Order orderNew = new Order();

        // set information for order
        orderNew.setName(order.getName());
        orderNew.setPhone(order.getPhone());
        orderNew.setNote(order.getNote());
        orderNew.setTotalAmount(order.getTotalAmount());
        orderNew.setOrderDate(new java.sql.Timestamp(System.currentTimeMillis()));

        // set shipping information for order
        orderNew.setProvince(order.getProvince());
        orderNew.setDistrict(order.getDistrict());
        orderNew.setWard(order.getWard());
        orderNew.setAddress(order.getAddress());
        orderNew.setShippingFee(order.getShippingFee());
        orderNew.setShippingCode(order.getShippingCode());

        // set user for order
        orderNew.setUser(userRepository.findById(order.getUserId()).orElseThrow(() -> new RuntimeException("User not found")));

        // set status for order
        OrderStatus orderStatus = orderStatusRepository.findById(1L).orElseThrow(() -> new RuntimeException("Order status not found"));
        orderNew.setStatus(orderStatus);

        // set payment information for order
        orderNew.setPaymentMethod(order.getPaymentMethod());
        orderNew.setPaymentStatus(order.getPaymentStatus());
        orderNew.setPaymentDate(order.getPaymentDate());

        // save order
        Order savedOrder = orderRepository.save(orderNew);

        // save order details
        for (OrderDetailRequest orderDetail : order.getOrderDetails()) {
            OrderDetail newOrderDetail = new OrderDetail();
            newOrderDetail.setProductId(productRepository.findById(orderDetail.getProductId()).orElseThrow(() -> new RuntimeException("Product not found")));
            newOrderDetail.setVariation(variationRepository.findById(orderDetail.getVariationId()).orElseThrow(() -> new RuntimeException("Variation not found")));
            newOrderDetail.setSize(sizeRepository.findById(orderDetail.getSizesId()).orElseThrow(() -> new RuntimeException("Size not found")));
            newOrderDetail.setPrice(orderDetail.getPrice());
            newOrderDetail.setQuantity(orderDetail.getQuantity());
            newOrderDetail.setOrder(savedOrder);
            orderDetailRepository.save(newOrderDetail);
        }

        // update stock
        for (OrderDetailRequest orderDetail : order.getOrderDetails()) {
            Size size = sizeRepository.findById(orderDetail.getSizesId()).orElseThrow(() -> new RuntimeException("Size not found"));
            if (size.getStock() < orderDetail.getQuantity()) {
                throw new RuntimeException("Not enough stock");
            }
            size.setStock(size.getStock() - orderDetail.getQuantity());
            sizeRepository.save(size);
        }

        // save order status history after saving the order
        OrderStatusHistory orderStatusHistory = new OrderStatusHistory();
        orderStatusHistory.setOrder(savedOrder);
        orderStatusHistory.setCreatedDate(new java.sql.Timestamp(System.currentTimeMillis()));
        orderStatusHistory.setStatus(orderStatus);
        orderStatusHistoryService.saveOrderStatusHistory(orderStatusHistory);
        return "Order created successfully";
    }

    @Override
    public ResponseEntity<?> updateOrderStatus(Long orderId, Long orderStatusId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        OrderStatus orderStatus = orderStatusRepository.findById(orderStatusId).orElseThrow(() -> new RuntimeException("Order status not found"));
        order.setStatus(orderStatus);
        Order savedOrder = orderRepository.save(order);

        if (savedOrder != null) {
            OrderStatusHistory orderStatusHistory = new OrderStatusHistory();
            orderStatusHistory.setOrder(order);
            orderStatusHistory.setCreatedDate(new java.sql.Timestamp(System.currentTimeMillis()));
            orderStatusHistory.setStatus(orderStatus);
            orderStatusHistoryService.saveOrderStatusHistory(orderStatusHistory);
            return ResponseEntity.ok("Order status updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Order status update failed");
        }
    }

    @Override
    public void exportOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Set<OrderDetail> orderDetails = order.getOrderDetails();

        Document document = new Document();
        try {
            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream("order_" + orderId + ".pdf"));
            document.open();
            document.addTitle("Order #" + orderId);

            Font boldFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.BOLD);
            Font regularFont = new Font(Font.FontFamily.TIMES_ROMAN, 12, Font.NORMAL);

            // Add header
            document.add(new Paragraph("Order Details", boldFont));
            document.add(new Paragraph("Order ID: " + orderId, regularFont));
            document.add(new Paragraph("Customer: " + order.getName(), regularFont));
            document.add(new Paragraph("Order Date: " + order.getOrderDate(), regularFont));
            document.add(Chunk.NEWLINE);

            // Add table for order details
            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{3, 1, 1});

            // Add table headers
            addTableHeader(table);

            // Add table rows
            for (OrderDetail orderDetail : orderDetails) {
                table.addCell(new PdfPCell(new Phrase(orderDetail.getProductId().getName(), regularFont)));
                table.addCell(new PdfPCell(new Phrase(String.valueOf(orderDetail.getQuantity()), regularFont)));
                table.addCell(new PdfPCell(new Phrase(String.valueOf(orderDetail.getPrice()), regularFont)));
            }
            document.add(table);

            // Add barcode
            Barcode128 barcode = new Barcode128();
            barcode.setCode(orderId.toString());
            Image barcodeImage = barcode.createImageWithBarcode(writer.getDirectContent(), BaseColor.BLACK, BaseColor.BLACK);
            barcodeImage.scalePercent(200);
            document.add(barcodeImage);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void addTableHeader(PdfPTable table) {
        Stream.of("Product", "Quantity", "Price")
                .forEach(columnTitle -> {
                    PdfPCell header = new PdfPCell();
                    header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                    header.setBorderWidth(2);
                    header.setPhrase(new Phrase(columnTitle));
                    table.addCell(header);
                });
    }


}
