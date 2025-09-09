package com.example.demo.client;

import com.example.demo.model.Book;
import com.example.demo.model.Category;
import com.example.demo.service.BookService;
import com.example.demo.service.CategoryService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class BookClient {

    private final BookService bookService;
    private final CategoryService categoryService;

    public BookClient(BookService bookService, CategoryService categoryService) {
        this.bookService = bookService;
        this.categoryService = categoryService;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            if (!bookService.getAllBooks().isEmpty()) {
                System.out.println("Database already contains books, skipping mock data insertion.");
                return;
            }

            // Create 'Non-Fiction' category
            Category newCategory = new Category();
            newCategory.setName("Non-Fiction");
            Category nonfictionCategory = categoryService.saveCategory(newCategory);

            // Mock Book 1
            Book mockBook1 = new Book();
            mockBook1.setTitle("Effective Java");
            mockBook1.setAuthor("Joshua Bloch");
            mockBook1.setProgress(10);
            mockBook1.setCategory(nonfictionCategory);

            // Mock Book 2
            Book mockBook2 = new Book();
            mockBook2.setTitle("Clean Code");
            mockBook2.setAuthor("Robert C. Martin");
            mockBook2.setProgress(40);
            mockBook2.setCategory(nonfictionCategory);

            // Mock Book 3
            Book mockBook3 = new Book();
            mockBook3.setTitle("Java: The Complete Reference");
            mockBook3.setAuthor("Herbert Schildt");
            mockBook3.setProgress(70);
            mockBook3.setCategory(nonfictionCategory);

            // Save the books using the BookService
            bookService.saveBook(mockBook1);
            bookService.saveBook(mockBook2);
            bookService.saveBook(mockBook3);

            System.out.println("Mock book added to the database: " + mockBook1.getTitle());
            System.out.println("Mock book added to the database: " + mockBook2.getTitle());
            System.out.println("Mock book added to the database: " + mockBook3.getTitle());
        };
    }
}
