package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getProductsStatusTrue() {
        return ResponseEntity.ok(productService.getProductsStatusTrue());
    }

    @GetMapping("/id")
    public ResponseEntity<?> getProductById(Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}
