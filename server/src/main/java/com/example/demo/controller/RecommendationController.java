package com.example.demo.controller;

import com.example.demo.service.ChatGptService;
import com.example.demo.service.BookService;
import com.example.demo.model.Book;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    private final ChatGptService chatGptService;
    private final BookService bookService;

    public RecommendationController(ChatGptService chatGptService, BookService bookService) {
        this.chatGptService = chatGptService;
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<String> getRecommendations() {
        List<Book> booksRead = bookService.getBooksRead(60);
        String prompt = generatePrompt(booksRead);
        try {
            String response = chatGptService.getRecommendations(prompt);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating recommendations");
        }
    }

    private String generatePrompt(List<Book> books) {
        String bookList = books.stream()
                               .map(Book::getTitle)
                               .collect(Collectors.joining(", "));
        return "The user has read " + bookList + ". Can you recommend similar books?";
    }
}
