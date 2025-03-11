package com.example.demo.service;

import com.example.demo.model.ReadingTime;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReadingTimeService {
    List<ReadingTime> getAllReadingTimes();
    Optional<ReadingTime> getReadingTimeById(Long id);
    Optional<ReadingTime> getReadingTimeByDate(LocalDate date);
    ReadingTime saveReadingTime(ReadingTime readingTime);
    void deleteReadingTime(Long id);
    boolean hasReadMoreThanOneHourToday();
}
