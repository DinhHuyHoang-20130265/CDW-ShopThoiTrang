package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.PromotionDto;

import java.util.List;

public interface PromotionService {

    Page<PromotionDto> getAllPromotion(String filter, int page, int perPage, String sortBy, String order);

    Promotion getPromotionById(long id);

    List<Product> getProductsByPromotionId(long id);

    Promotion savePromotion(Promotion promotion);

    Promotion updatePromotion(long id, Promotion promotion);
}
