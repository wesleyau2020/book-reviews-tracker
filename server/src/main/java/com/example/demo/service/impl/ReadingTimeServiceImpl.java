package com.example.demo.service.impl;

import com.example.demo.model.ReadingTime;
import com.example.demo.repository.ReadingTimeRepository;
import com.example.demo.service.ReadingTimeService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReadingTimeServiceImpl implements ReadingTimeService {

    private final ReadingTimeRepository repository;

    public ReadingTimeServiceImpl(ReadingTimeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ReadingTime> getAllReadingTimes() {
        return repository.findAll();
    }

    @Override
    public Optional<ReadingTime> getReadingTimeById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<ReadingTime> getReadingTimeByDate(LocalDate date) {
        return repository.findByDate(date);
    }

    @Override
    public ReadingTime saveReadingTime(ReadingTime readingTime) {
        return repository.save(readingTime);
    }

    @Override
    public ReadingTime saveOrUpdateReadingTime(ReadingTime newReadingTime) {
        Optional<ReadingTime> existing = repository.findByDate(newReadingTime.getDate());

        if (existing.isPresent()) {
            ReadingTime current = existing.get();
            current.setMinutesSpent(current.getMinutesSpent() + newReadingTime.getMinutesSpent());
            return repository.save(current);
        } else {
            return repository.save(newReadingTime);
        }
    }

    @Override
    public void deleteReadingTime(Long id) {
        repository.deleteById(id);
    }

    @Override
    public boolean hasReadMoreThanOneHourToday() {
        LocalDate today = LocalDate.now();
        int totalMinutes = repository.getTotalReadingMinutesByDate(today);
        return totalMinutes > 60; // Returns true if reading time > 60 minutes
    }
}
