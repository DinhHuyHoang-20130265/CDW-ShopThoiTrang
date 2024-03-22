package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPromotion() {
        return ResponseEntity.ok(promotionService.getAllPromotion());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable int id) {
        return ResponseEntity.ok(promotionService.getPromotionById(id));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductsByPromotionId(@PathVariable int id) {
        return ResponseEntity.ok(promotionService.getProductsByPromotionId(id));
    }
}
