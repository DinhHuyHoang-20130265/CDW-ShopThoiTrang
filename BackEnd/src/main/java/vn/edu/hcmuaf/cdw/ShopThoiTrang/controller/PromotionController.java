package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

@RestController
@RequestMapping("/api/promotion")
public class PromotionController {

    @Autowired
    HttpServletRequest request;

    @Autowired
    private PromotionService promotionService;

    @GetMapping()
    public ResponseEntity<?> getAllPromotion(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "{}") String filter,
                                             @RequestParam(defaultValue = "25") int perPage,
                                             @RequestParam(defaultValue = "name") String sort,
                                             @RequestParam(defaultValue = "DESC") String order) {
        return ResponseEntity.ok(promotionService.getAllPromotion(filter, page, perPage, sort, order));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable int id) {
        return ResponseEntity.ok(promotionService.getPromotionById(id));
    }

    @PostMapping
    public ResponseEntity<?> savePromotion(@RequestBody Promotion promotion) {
        return ResponseEntity.ok(promotionService.savePromotion(promotion, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable int id, @RequestBody Promotion promotion) {
        return ResponseEntity.ok(promotionService.updatePromotion(id, promotion, request));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductsByPromotionId(@PathVariable int id) {
        return ResponseEntity.ok(promotionService.getProductsByPromotionId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable Long id) {
        return ResponseEntity.ok(promotionService.deletePromotion(id, request));
    }
}
