package com.example.demo.service.impl;

import com.example.demo.model.CompletionDate;
import com.example.demo.repository.CompletionDateRepository;
import com.example.demo.service.CompletionDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompletionDateServiceImpl implements CompletionDateService {

    private final CompletionDateRepository completionDateRepository;

    @Autowired
    public CompletionDateServiceImpl(CompletionDateRepository completionDateRepository) {
        this.completionDateRepository = completionDateRepository;
    }

    @Override
    public Optional<CompletionDate> getCompletionDateByBookId(Long bookId) {
        return Optional.ofNullable(completionDateRepository.findByBookId(bookId));
    }

    @Override
    public CompletionDate saveCompletionDate(CompletionDate completionDate) {
        return completionDateRepository.save(completionDate);
    }

    @Override
    public void deleteCompletionDate(Long id) {
        completionDateRepository.deleteById(id);
    }
}
