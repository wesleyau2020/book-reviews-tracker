package com.example.demo.controller;

import com.example.demo.model.CompletionDate;
import com.example.demo.service.CompletionDateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/completion-dates")

public class CompletionDateController {

    private final CompletionDateService completionDateService;

    @Autowired
    public CompletionDateController(CompletionDateService completionDateService) {
        this.completionDateService = completionDateService;
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<CompletionDate> getCompletionDateByBookId(@PathVariable Long bookId) {
        Optional<CompletionDate> completionDate = completionDateService.getCompletionDateByBookId(bookId);
        return completionDate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CompletionDate createCompletionDate(@RequestBody CompletionDate completionDate) {
        return completionDateService.saveCompletionDate(completionDate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompletionDate(@PathVariable Long id) {
        completionDateService.deleteCompletionDate(id);
        return ResponseEntity.noContent().build();
    }
}
