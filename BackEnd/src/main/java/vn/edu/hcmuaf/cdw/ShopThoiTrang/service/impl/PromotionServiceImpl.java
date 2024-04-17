package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Category;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Price;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.PromotionDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PromotionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;


    @Override
    public Page<PromotionDto> getAllPromotion(String filter, int page, int perPage, String sortBy, String order) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (order.equalsIgnoreCase("DESC"))
            direction = Sort.Direction.DESC;

        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(filter, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        Specification<Promotion> specification = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            if (filterJson.has("q")) {

                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
            }
            if (filterJson.has("status")) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("status"), filterJson.get("status").asBoolean()));
            }
            if (filterJson.has("expired")) {
            }
            return predicate;
        };

        return switch (sortBy) {
            case "name" ->
                    promotionRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "name"))).map(PromotionDto::from);
            case "status" ->
                    promotionRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, "status"))).map(PromotionDto::from);
            default ->
                    promotionRepository.findAll(specification, PageRequest.of(page, perPage, Sort.by(direction, sortBy))).map(PromotionDto::from);
        };
    }

    @Override
    public Promotion getPromotionById(long id) {
        return promotionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getProductsByPromotionId(long id) {
        return promotionRepository.findById(id).orElse(null).getProducts();
    }

    @Override
    public Promotion savePromotion(Promotion promotion) {
        Date date = new Date(System.currentTimeMillis());
        promotion.setCreatedDate(date);
        promotion.setUpdatedDate(date);
        return promotionRepository.save(promotion);
    }

    @Override
    public Promotion updatePromotion(long id, Promotion promotion) {
        Promotion promotion1 = promotionRepository.findById(id).orElse(null);
        if (promotion1 == null) {
            return null;
        }
        promotion1.setName(promotion.getName());
        promotion1.setDescription(promotion.getDescription());
        promotion1.setDiscount(promotion.getDiscount());
        promotion1.setStatus(promotion.isStatus());
        promotion1.setThumbnail(promotion.getThumbnail());
        promotion1.setStartDate(promotion.getStartDate());
        promotion1.setEndDate(promotion.getEndDate());
        promotion1.setUpdatedDate(new Date(System.currentTimeMillis()));
        promotion1.setUpdatedBy(promotion.getUpdatedBy());
        promotion1.setProducts(promotion.getProducts());
        return promotionRepository.save(promotion1);
    }
}
