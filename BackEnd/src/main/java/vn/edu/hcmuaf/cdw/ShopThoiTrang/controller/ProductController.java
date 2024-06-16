package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    HttpServletRequest request;

    @GetMapping("/user")
    public ResponseEntity<?> getProductsStatusTrue() {
        return ResponseEntity.ok(productService.getProductsStatusTrueAndDeleteFalse());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping("/ids")
    public ResponseEntity<?> getAllProducts(@RequestParam(defaultValue = "{}") String ids) {
        return ResponseEntity.ok(productService.getAllProducts(ids));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or @securityService.isSuperAdmin()")
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "{}") String filter,
                                                        @RequestParam(defaultValue = "25") int perPage,
                                                        @RequestParam(defaultValue = "name") String sort,
                                                        @RequestParam(defaultValue = "DESC") String order) {
        Page<Product> products = productService.getAllProducts(filter, page, perPage, sort, order);
        return ResponseEntity.ok(products);
    }

    @ResponseStatus
    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('PRODUCT_CREATE')) or @securityService.isSuperAdmin()")
    @PostMapping
    public ResponseEntity<?> saveProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('PRODUCT_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product, request));
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('PRODUC_DELETE')) or @securityService.isSuperAdmin()")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id, request);
        return ResponseEntity.ok("Deleted");
    }

    @PreAuthorize("(hasAuthority('ROLE_ADMIN') and hasAuthority('PRODUCT_UPDATE')) or @securityService.isSuperAdmin()")
    @PutMapping("/deleted/{id}")
    public ResponseEntity<?> restoreProduct(@PathVariable Long id) {;
        return ResponseEntity.ok(productService.restoreProduct(id, request));
    }

}
