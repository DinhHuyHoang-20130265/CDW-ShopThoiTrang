package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PromotionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Override
    public List<Promotion> getAllPromotion() {
        return promotionRepository.findAll();
    }

    @Override
    public Promotion getPromotionById(int id) {
        return promotionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getProductsByPromotionId(int id) {
        return promotionRepository.findById(id).orElse(null).getProducts();
    }
}
