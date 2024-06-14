package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.JWT.JwtUtils;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Product;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Promotion;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.PromotionDto;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ProductRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.PromotionRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.PromotionService;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {
    private static final Logger Log = Logger.getLogger(PromotionServiceImpl.class.getName());
    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<PromotionDto> getAllPromotion(String filter, int page, int perPage, String sortBy, String order) {
        try {
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
        } catch (RuntimeException e) {
            Log.error("Error while getting all promotions", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Promotion getPromotionById(long id) {
        try {
            return promotionRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error while getting promotion by id", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Product> getProductsByPromotionId(long id) {
        try {
            return promotionRepository.findById(id).orElse(null).getProducts();
        } catch (Exception e) {
            Log.error("Error while getting products by promotion id", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Promotion savePromotion(Promotion promotion, HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
        promotion.setCreatedBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        promotion.setUpdatedBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        try {
            Date date = new Date(System.currentTimeMillis());
            promotion.setCreatedDate(date);
            promotion.setUpdatedDate(date);

            List<Product> products = new ArrayList<>();
            for (Product product : promotion.getProducts()) {
                Product existingProduct = productRepository.findById(product.getId()).orElse(null);
                promotion.getProducts().add(existingProduct);
                existingProduct.getPromotions().add(promotion);
                products.add(existingProduct);
            }
            promotion.setProducts(products);

            Log.info(promotion.getCreatedBy().getUsername() + " created promotion " + promotion.getName());
            return promotionRepository.save(promotion);
        } catch (Exception e) {
            Log.error("Error while saving promotion", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Promotion updatePromotion(long id, Promotion promotion, HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
        promotion.setUpdatedBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        try {
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
            if (promotion.getProducts() != null) {
                for (Product product : promotion.getProducts()) {
                    Product existingProduct = productRepository.findById(product.getId()).orElse(null);
                    if (!existingPromotion.getProducts().contains(existingProduct)) {
                        existingPromotion.getProducts().add(existingProduct);
                        existingProduct.getPromotions().add(existingPromotion);
                    }
                    products.add(existingProduct);
                }
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

            Log.info(promotion.getUpdatedBy().getUsername() + " updated promotion " + promotion.getName());
            return promotionRepository.save(existingPromotion);
        } catch (Exception e) {
            Log.error("Error while updating promotion", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Promotion deletePromotion(Long id, HttpServletRequest request) {
        String jwt = jwtUtils.getJwtFromCookies(request, "shop2h_admin");
        String username = jwtUtils.getUserNameFromJwtToken(jwt);
        Promotion promotion = promotionRepository.findById(id).orElse(null);
        if (promotion == null) {
            return null;
        }
        promotion.setUpdatedBy(userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(jwt)).orElse(null));
        promotion.setStatus(false);
        promotion.setUpdatedDate(new Date(System.currentTimeMillis()));
        promotion.setProducts(new ArrayList<>());
        try {
            Log.info(username + " deleted promotion " + promotion.getName());
            promotionRepository.delete(promotion);
            return promotion;
        } catch (Exception e) {
            Log.error("Error while deleting promotion", e);
            throw new RuntimeException(e);
        }
    }
}
