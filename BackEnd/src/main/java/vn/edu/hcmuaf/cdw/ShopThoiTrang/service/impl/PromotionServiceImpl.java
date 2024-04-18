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
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ProductRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PromotionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

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
        Promotion existingPromotion = promotionRepository.findById(id).orElse(null);
        if (existingPromotion == null) {
            return null;
        }
        existingPromotion.setName(promotion.getName());
        existingPromotion.setDescription(promotion.getDescription());
        existingPromotion.setDiscount(promotion.getDiscount());
        existingPromotion.setStatus(promotion.isStatus());
        existingPromotion.setThumbnail(promotion.getThumbnail());
        existingPromotion.setStartDate(promotion.getStartDate());
        existingPromotion.setEndDate(promotion.getEndDate());
        existingPromotion.setUpdatedDate(new Date(System.currentTimeMillis()));
        existingPromotion.setUpdatedBy(promotion.getUpdatedBy());

        List<Product> products = new ArrayList<>();
        for (Product product : promotion.getProducts()) {
            Product existingProduct = productRepository.findById(product.getId()).orElse(null);
            if (!existingPromotion.getProducts().contains(existingProduct)) {
                existingPromotion.getProducts().add(existingProduct);
                existingProduct.getPromotions().add(existingPromotion);
            }
            products.add(existingProduct);
        }
        List<Product> productsToRemove = new ArrayList<>();

        for (Product existingProduct : existingPromotion.getProducts()) {
            if (!products.contains(existingProduct)) {
                productsToRemove.add(existingProduct);
                existingProduct.getPromotions().remove(existingPromotion);
            }
        }


        existingPromotion.getProducts().removeAll(productsToRemove);

        System.out.println(existingPromotion.getProducts().stream().map(Product::getName).toList());
        System.out.println(products.stream().map(Product::getName).toList());
        existingPromotion.getProducts().removeIf(product -> !products.contains(product));
        existingPromotion.setProducts(products);

        return promotionRepository.save(existingPromotion);
    }
}
