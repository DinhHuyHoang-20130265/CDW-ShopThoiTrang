package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Notification;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.CreateOrderRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.NotificationService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private HttpServletRequest request;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping
    public ResponseEntity<?> getAllOrders(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "{}") String filter,
                                          @RequestParam(defaultValue = "25") int perPage,
                                          @RequestParam(defaultValue = "id") String sort,
                                          @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(orderService.getAllOrders(filter, page, perPage, sort, order));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping
    public ResponseEntity<?> saveOrder(@RequestBody CreateOrderRequest order) {
        ResponseEntity<?> response = orderService.createOrder(order);
        Order orderEntity = (Order) response.getBody();
        if (response.getStatusCode().is2xxSuccessful()) {
            Notification notification = notificationService.createNotification("New order has been created", orderEntity.getId(), "order");
            // Gửi thông báo qua WebSocket
            messagingTemplate.convertAndSend("/topic/notifications", notification);
        }
        return response;
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('ORDER_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}/status/{statusId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @PathVariable Long statusId) {
        return orderService.updateOrderStatus(id, statusId);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/{id}/export")
    public ResponseEntity<?> exportOrder(@PathVariable Long id) {
        return orderService.exportOrder(id);
    }

    @PreAuthorize("@securityService.isUser()")
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        System.out.println("Cancel order");
        return orderService.updateOrderStatus(id, 7L);
    }
}
