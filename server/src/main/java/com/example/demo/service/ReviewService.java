package com.example.demo.service;

import com.example.demo.model.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    List<Review> getAllReviews();

    Optional<Review> getReviewById(Long id);

    Review saveReview(Review review);

    void deleteReview(Long id);

    Review getReviewByBookId(Long bookId);
}
