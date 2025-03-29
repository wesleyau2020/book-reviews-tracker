package com.example.demo.controller;

import com.example.demo.service.BookService;
import com.example.demo.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/statistics")

public class StatisticsController {

    private final BookService bookService;

    @Autowired
    public StatisticsController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/books-completed")
    public ResponseEntity<Map<String, List<Integer>>> getBooksCompletedByCategoryPerMonth() {
        List<Book> books = bookService.getAllBooks();
        Map<String, List<Integer>> result = new HashMap<>(); // Category => List of Months

        for (Book book : books) {
            LocalDate completionDate = book.getCompletionDate();
            if (completionDate != null) {
                String categoryName = book.getCategory() != null ? book.getCategory().getName() : "Unknown";
                int month = completionDate.getMonthValue() - 1;

                // Initialize category entry in the result map
                result.putIfAbsent(categoryName, new ArrayList<>(Collections.nCopies(12, 0)));

                // Increment the count for this category
                List<Integer> monthlyCounts = result.get(categoryName);
                monthlyCounts.set(month, monthlyCounts.get(month) + 1);
            }
        }

        return ResponseEntity.ok(result);
    }
}
