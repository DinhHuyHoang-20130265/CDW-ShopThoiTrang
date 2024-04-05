package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    List<Product> getProductsStatusTrue();

    Product getProductById(Long id);

    Page<Product> getAllProducts(String filter, int page, int perPage, String sortBy, String order);

    void deleteProduct(Long id);

    Product saveProduct(Product product);

    void updateProduct(long id,Product product);
}
