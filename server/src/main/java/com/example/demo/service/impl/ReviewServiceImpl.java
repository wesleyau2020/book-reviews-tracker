package com.example.demo.service.impl;

import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Review getReviewByBookId(Long bookId) {
        return reviewRepository.findByBookId(bookId);
    }

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
