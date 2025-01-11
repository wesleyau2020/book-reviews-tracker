package com.example.demo.controller;

import com.example.demo.model.CompletionDate;
import com.example.demo.service.CompletionDateService;
import com.example.demo.service.BookService;
import com.example.demo.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/statistics")

public class StatisticsController {

    private final BookService bookService;
    private final CompletionDateService completionDateService;

    @Autowired
    public StatisticsController(BookService bookService, CompletionDateService completionDateService) {
        this.bookService = bookService;
        this.completionDateService = completionDateService;
    }

    @GetMapping("/books-completed")
    public ResponseEntity<Map<String, List<Integer>>> getBooksCompletedByCategoryPerMonth() {
        List<Book> books = bookService.getAllBooks();
        Map<String, List<Integer>> result = new HashMap<>(); // category => [count_1, count_2, ..., count_12]

        // Initialize data for each category
        for (Book book : books) {
            // Check if the book has a completion date
            Optional<CompletionDate> completionDateOpt = completionDateService.getCompletionDateByBookId(book.getId());
            if (completionDateOpt.isPresent()) {
                CompletionDate completionDate = completionDateOpt.get();
                String categoryName = book.getCategory() != null ? book.getCategory().getName() : "Unknown";

                // Get the month from the completion date
                int month = Integer.parseInt(completionDate.getDate().substring(3, 5)) - 1;

                // Initialize category entry in the result map if not already present
                result.putIfAbsent(categoryName, new ArrayList<>(Collections.nCopies(12, 0)));

                // Increment the count for this category in the correct month
                List<Integer> monthlyCounts = result.get(categoryName);
                monthlyCounts.set(month, monthlyCounts.get(month) + 1);
            }
        }

        return ResponseEntity.ok(result);
    }
}
