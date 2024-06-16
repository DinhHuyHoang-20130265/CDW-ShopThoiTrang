package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.OrderStatusService;

@RestController
@RequestMapping("/api/order-status")
public class OrderStatusController {

    @Autowired
    private OrderStatusService orderStatusService;

    @GetMapping
    public ResponseEntity<?> getAllOrderStatus() {
        return ResponseEntity.ok(orderStatusService.getAllOrderStatus());
    }
}
