package vn.edu.hcmuaf.cdw.ShopThoiTrang.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.Review;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.model.dto.ReviewRequest;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.NotificationService;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.service.ReviewService;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest review) {
        Review reviewEntity = reviewService.createReview(review);
        if (reviewEntity != null) {
            notificationService.createNotification("New review has been created", reviewEntity.getId(), "review");
            messagingTemplate.convertAndSend("/topic/notifications", reviewEntity);
        }
        return ResponseEntity.ok(reviewEntity);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping
    public ResponseEntity<Page<Review>> getAllReviews(@RequestParam(defaultValue = "0") int start,
                                                      @RequestParam(defaultValue = "{}") String filter,
                                                      @RequestParam(defaultValue = "25") int end,
                                                      @RequestParam(defaultValue = "reviewedDate") String sort,
                                                      @RequestParam(defaultValue = "DESC") String order) {
        Page<Review> reviews = reviewService.getAllReviews(filter, start, end, sort, order);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Review>> getAllReviews(@RequestParam(defaultValue = "{}") String ids) {
        List<Review> reviews = reviewService.getAllReviews(ids);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        Review review = reviewService.getReviewById(id);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Object type) {
        LinkedHashMap<String, Integer> map;
        map = (LinkedHashMap<String, Integer>) type;
        Review updatedReview = reviewService.updateReview(id, map.get("type"));
        return ResponseEntity.ok(updatedReview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
