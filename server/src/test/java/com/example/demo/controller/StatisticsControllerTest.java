package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.model.Category;
import com.example.demo.service.BookService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class StatisticsControllerTest {

    private MockMvc mockMvc;

    @Mock
    private BookService bookService;

    @InjectMocks
    private StatisticsController statisticsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(statisticsController).build();
    }

    @Test
    void testGetBooksCompletedByCategoryPerMonth() throws Exception {
        // Create sample books with completion dates
        Category category1 = new Category("Fiction");
        Category category2 = new Category("Non-fiction");

        Book book1 = new Book("Book 1", "Author 1", 50);
        book1.setCategory(category1);
        book1.setCompletionDate(LocalDate.of(2025, 3, 10));

        Book book2 = new Book("Book 2", "Author 2", 80);
        book2.setCategory(category1);
        book2.setCompletionDate(LocalDate.of(2025, 2, 5));

        Book book3 = new Book("Book 3", "Author 3", 100);
        book3.setCategory(category2);
        book3.setCompletionDate(LocalDate.of(2025, 3, 20));

        List<Book> books = Arrays.asList(book1, book2, book3);

        // Mock the BookService to return the books
        when(bookService.getAllBooks()).thenReturn(books);

        // Perform the GET request and verify the response
        mockMvc.perform(get("/api/statistics/books-completed")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Fiction[2]").value(1)) // March: 1 book completed in Fiction
                .andExpect(jsonPath("$.Fiction[1]").value(1)) // February: 1 book completed in Fiction
                .andExpect(jsonPath("$.Non-fiction[2]").value(1)) // March: 1 book completed in Non-fiction
                .andExpect(jsonPath("$.Non-fiction[0]").value(0)); // January: No books completed in Non-fiction
        // .andExpect(jsonPath("$.Unknown[0]").value(0));
    }
}
