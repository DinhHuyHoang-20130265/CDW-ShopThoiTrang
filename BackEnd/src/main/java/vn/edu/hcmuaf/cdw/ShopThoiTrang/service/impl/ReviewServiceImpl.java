package vn.edu.hcmuaf.cdw.ShopThoiTrang.service.impl;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ReviewService;

import java.util.List;

public class ReviewServiceImpl implements ReviewService {
    @Override
    public Page<Review> getAllReviews(String filter, int start, int end, String sortBy, String order) {
        return null;
    }

    @Override
    public List<Review> getAllReviews(String ids) {
        return List.of();
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
