package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ProductRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;


    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }
}
