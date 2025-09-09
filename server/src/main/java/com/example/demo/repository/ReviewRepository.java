package com.example.demo.repository;

import com.example.demo.model.Review;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findByBookId(Long bookId);
}
