package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;


import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProductById(Long id);
}
