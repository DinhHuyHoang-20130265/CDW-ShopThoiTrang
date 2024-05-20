package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Order;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<?> getAllOrders(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "{}") String filter,
                                          @RequestParam(defaultValue = "25") int perPage,
                                          @RequestParam(defaultValue = "id") String sort,
                                          @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(orderService.getAllOrders(filter, page, perPage, sort, order));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<?> saveOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @PutMapping("/{id}/status/{statusId}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @PathVariable Long statusId) {
        return orderService.updateOrderStatus(id, statusId);
    }
}
