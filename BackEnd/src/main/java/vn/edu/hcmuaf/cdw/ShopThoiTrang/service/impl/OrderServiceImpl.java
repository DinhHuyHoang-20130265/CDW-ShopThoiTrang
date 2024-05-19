package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderDetailService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusHistoryService;

import java.nio.charset.StandardCharsets;

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
    private EntityManager entityManager;


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
    public String createOrder(Order order) {
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
        orderNew.setUser(order.getUser());

        // set status for order
        OrderStatus orderStatus = orderStatusRepository.findById(1L).orElseThrow(() -> new RuntimeException("Order status not found"));
        orderNew.setStatus(orderStatus);

        // save order
        Order savedOrder = orderRepository.save(orderNew);

        // save order details
        for (OrderDetail orderDetail : order.getOrderDetails()) {
            orderDetail.setOrder(savedOrder);
            orderDetailRepository.save(orderDetail);
        }

        // update stock
        for (OrderDetail orderDetail : order.getOrderDetails()) {
            Size size = sizeRepository.findById(orderDetail.getSize().getId()).orElseThrow(() -> new RuntimeException("Size not found"));
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


}
