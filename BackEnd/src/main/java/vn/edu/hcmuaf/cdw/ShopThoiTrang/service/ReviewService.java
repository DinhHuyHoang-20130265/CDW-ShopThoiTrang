package vn.edu.hcmuaf.cdw.ShopThoiTrang.service;

import org.springframework.data.domain.Page;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;

import java.util.List;

public interface ReviewService {
    Page<Review> getAllReviews(String filter, int start, int end, String sortBy, String order);

    List<Review> getAllReviews(String ids);

    Review getReviewById(Long id);

    Review updateReview(Long id, Review review);

    void deleteReview(Long id);
}
