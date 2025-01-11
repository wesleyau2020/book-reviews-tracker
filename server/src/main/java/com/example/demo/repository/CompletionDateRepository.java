package com.example.demo.repository;

import com.example.demo.model.CompletionDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompletionDateRepository extends JpaRepository<CompletionDate, Long> {
    CompletionDate findByBookId(Long bookId);
}
