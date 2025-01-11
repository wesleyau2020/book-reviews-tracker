package com.example.demo.controller;

import com.example.demo.model.Review;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/reviews")

public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    private static final Logger logger = LoggerFactory.getLogger(ReviewController.class);

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        try {
            logger.info("Received request to create review: {}", review);
            logger.info("Book from review: {}", review.getBook());

            // Validate the review
            if (review.getBook() == null || review.getBook().getId() == null) {
                logger.warn("Invalid review payload: Missing book information.");
                return ResponseEntity.badRequest().build();
            }

            // Save the review
            Review savedReview = reviewService.saveReview(review);
            logger.info("Review successfully saved: {}", savedReview);
            return ResponseEntity.ok(savedReview);

        } catch (Exception e) {
            logger.error("Error occurred while creating review", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewService.getReviewById(id)
                .map(existingReview -> {
                    existingReview.setContent(updatedReview.getContent());
                    existingReview.setReviewerName(updatedReview.getReviewerName());
                    return ResponseEntity.ok(reviewService.saveReview(existingReview));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        if (reviewService.getReviewById(id).isPresent()) {
            reviewService.deleteReview(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
