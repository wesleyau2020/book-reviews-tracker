package com.example.demo.repository;

import com.example.demo.model.ReadingTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ReadingTimeRepository extends JpaRepository<ReadingTime, Long> {
    Optional<ReadingTime> findByDate(LocalDate date);
    
    @Query("SELECT COALESCE(SUM(rt.minutesSpent), 0) FROM ReadingTime rt WHERE rt.date = :date")
    int getTotalReadingMinutesByDate(LocalDate date);
}
