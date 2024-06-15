package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    List<Product> getAllProducts(String ids);

    List<Product> getProductsStatusTrueAndDeleteFalse();

    Product getProductById(Long id);

    Page<Product> getAllProducts(String filter, int page, int perPage, String sortBy, String order);

    void deleteProduct(Long id, HttpServletRequest request);

    void restoreProduct(Long id, HttpServletRequest request);

    ResponseEntity<?> saveProduct(Product product, HttpServletRequest request);

    ResponseEntity<?> updateProduct(long id, Product product, HttpServletRequest request);
}
