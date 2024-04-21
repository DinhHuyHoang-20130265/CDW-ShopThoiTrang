package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.reponsitory.ReviewRepository;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ReviewService;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Page<Review> getAllReviews(String filter, int start, int end, String sortBy, String order) {
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
            System.out.println(filterJson.get("ids"));
            List<Long> idsList = new ArrayList<>();
            for (JsonNode idNode : filterJson.get("ids")) {
                System.out.println(idNode);
                idsList.add(idNode.asLong());
            }
            Iterable<Long> itr = List.of(Stream.of(idsList).flatMap(List::stream).toArray(Long[]::new));
            return reviewRepository.findAllById(itr);
        }

        return null;
    }

    @Override
    public Review getReviewById(Long id) {
        return null;
    }

    @Override
    public Review updateReview(Long id, Review review) {
        return null;
    }
}
