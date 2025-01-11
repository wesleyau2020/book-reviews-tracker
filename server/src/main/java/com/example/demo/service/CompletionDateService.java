package com.example.demo.service;

import com.example.demo.model.CompletionDate;

import java.util.Optional;

public interface CompletionDateService {
    Optional<CompletionDate> getCompletionDateByBookId(Long bookId);

    CompletionDate saveCompletionDate(CompletionDate completionDate);

    void deleteCompletionDate(Long id);
}
