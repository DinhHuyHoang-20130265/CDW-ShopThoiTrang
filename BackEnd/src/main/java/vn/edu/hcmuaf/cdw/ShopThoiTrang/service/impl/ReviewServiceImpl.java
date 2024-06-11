package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ReviewRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.OrderDetailRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ProductRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ReviewRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.UserRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ReviewService;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ReviewServiceImpl implements ReviewService {

    private static final Logger Log = Logger.getLogger(ReviewServiceImpl.class.getName());

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public Review createReview(ReviewRequest reviewRequest) {
        try {
            java.sql.Date date = new java.sql.Date(new Date().getTime());
            Review review = new Review();
            review.setContent(reviewRequest.getContent());
            review.setRating(reviewRequest.getRating());
            review.setStatus(true);
            review.setType(0);
            review.setProduct(productRepository.findById(reviewRequest.getProduct()).orElse(null));
            review.setReviewedDate(date);
            review.setDeleted(false);
            review.setReviewer(userRepository.findById(reviewRequest.getReviewer()).orElse(null));
            review.setOrderDetail(orderDetailRepository.findById(reviewRequest.getOrderDetail()).orElse(null));

            Log.info("Review created: " + review);
            return reviewRepository.save(review);
        } catch (Exception e) {
            Log.error("Error in createReview: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Review> getReviewsByProductId(Long productId) {
        try {
            return reviewRepository.findAllByProductIdAndType(productId, 2);
        } catch (Exception e) {
            Log.error("Error in getReviewsByProductId: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Page<Review> getAllReviews(String filter, int start, int end, String sortBy, String order) {
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
            Specification<Review> specification = (root, query, criteriaBuilder) -> {
                Predicate predicate = criteriaBuilder.conjunction();
                if (filterJson.has("q")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("content"), "%" + filterJson.get("q").asText().toLowerCase() + "%"));
                }
                if (filterJson.has("type")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("type"), filterJson.get("type").asInt()));
                }
                if (filterJson.has("reviewer.id")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("reviewer").get("id"), filterJson.get("reviewer.id").asLong()));
                }
                if (filterJson.has("product.id")) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("product").get("id"), filterJson.get("product.id").asLong()));
                }
                if (filterJson.has("reviewedDate")) {
                    String dateString = filterJson.get("reviewedDate").asText();
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                    Date date;
                    try {
                        date = format.parse(dateString);
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("reviewedDate"), date));
                }
                return predicate;
            };
            return switch (sortBy) {
                case "status" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "status")));
                case "reviewedDate" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "reviewedDate")));
                case "type" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "type")));
                case "reviewer" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "reviewer")));
                case "product" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "product")));
                case "rating" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "rating")));
                case "content" ->
                        reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, "content")));
                default -> reviewRepository.findAll(specification, PageRequest.of(start, end, Sort.by(direction, sortBy)));
            };
        } catch (RuntimeException e) {
            Log.error("Error in getAllReviews: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Review> getAllReviews(String ids) {
        JsonNode filterJson;
        try {
            filterJson = new ObjectMapper().readTree(java.net.URLDecoder.decode(ids, StandardCharsets.UTF_8));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (filterJson.has("ids")) {
            List<Long> idsList = new ArrayList<>();
            for (JsonNode idNode : filterJson.get("ids")) {
                idsList.add(idNode.asLong());
            }
            Iterable<Long> itr = List.of(Stream.of(idsList).flatMap(List::stream).toArray(Long[]::new));
            return reviewRepository.findAllById(itr);
        }

        return null;
    }

    @Override
    public Review getReviewById(Long id) {
        try {
            return reviewRepository.findById(id).orElse(null);
        } catch (Exception e) {
            Log.error("Error in getReviewById: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Review updateReview(Long id, int type) {
        try {
            Review reviewToUpdate = reviewRepository.findById(id).orElse(null);
            reviewToUpdate.setType(type);
            Log.info("Review updated: " + reviewToUpdate);
            return reviewRepository.save(reviewToUpdate);
        } catch (Exception e) {
            Log.error("Error in updateReview: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteReview(Long id) {
        try {
            Review review = reviewRepository.findById(id).orElse(null);
            if (review == null) {
                return;
            }
            review.setDeleted(true);
            Log.info("Review deleted: " + review);
            reviewRepository.save(review);
        } catch (Exception e) {
            Log.error("Error in deleteReview: ", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void hardDeleteReview(Long id) {
        try {
            Log.info("Review hard deleted: " + id);
            reviewRepository.deleteById(id);
        } catch (Exception e) {
            Log.error("Error in hardDeleteReview: ", e);
            throw new RuntimeException(e);
        }
    }
}
