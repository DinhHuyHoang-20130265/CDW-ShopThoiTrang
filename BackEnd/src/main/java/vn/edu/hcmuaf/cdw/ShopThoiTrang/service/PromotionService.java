package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;

import java.util.List;

public interface PromotionService {

    List<Promotion> getAllPromotion();

    Promotion getPromotionById(int id);

    List<Product> getProductsByPromotionId(int id);
}
