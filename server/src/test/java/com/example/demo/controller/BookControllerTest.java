package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.model.Review;
import com.example.demo.service.BookService;
import com.example.demo.service.ReviewService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Optional;

class BookControllerTest {

    private MockMvc mockMvc;

    @Mock
    private BookService bookService;

    @Mock
    private ReviewService reviewService;

    @InjectMocks
    private BookController bookController;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bookController).build();
    }

    @Test
    void testGetAllBooks() throws Exception {
        Book book1 = new Book("Spring Boot in Action", "Craig Walls", 80);
        Book book2 = new Book("Java Programming", "John Doe", 120);
        when(bookService.getAllBooks()).thenReturn(Arrays.asList(book1, book2));

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Spring Boot in Action"))
                .andExpect(jsonPath("$[1].author").value("John Doe"));
    }

    @Test
    void testGetBookById() throws Exception {
        Book book = new Book("Spring Boot in Action", "Craig Walls", 80);
        when(bookService.getBookById(1L)).thenReturn(Optional.of(book));

        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Spring Boot in Action"))
                .andExpect(jsonPath("$.author").value("Craig Walls"));
    }

    @Test
    void testGetBookById_NotFound() throws Exception {
        when(bookService.getBookById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/books/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateBook() throws Exception {
        Book book = new Book("Spring Boot in Action", "Craig Walls", 80);
        when(bookService.saveBook(any(Book.class))).thenReturn(book);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Spring Boot in Action"))
                .andExpect(jsonPath("$.author").value("Craig Walls"));
    }

    @Test
    void testUpdateBook() throws Exception {
        Book existingBook = new Book("Spring Boot in Action", "Craig Walls", 80);
        Book updatedBook = new Book("Spring Boot 2", "Craig Walls", 100);
        when(bookService.getBookById(1L)).thenReturn(Optional.of(existingBook));
        when(bookService.saveBook(any(Book.class))).thenReturn(updatedBook);

        mockMvc.perform(put("/api/books/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedBook)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Spring Boot 2"))
                .andExpect(jsonPath("$.progress").value(100));
    }

    @Test
    void testUpdateBook_NotFound() throws Exception {
        Book updatedBook = new Book("Spring Boot 2", "Craig Walls", 100);
        when(bookService.getBookById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/books/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedBook)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteBook() throws Exception {
        when(bookService.getBookById(1L)).thenReturn(Optional.of(new Book("Spring Boot in Action", "Craig Walls", 80)));

        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isNoContent());

        verify(bookService, times(1)).deleteBook(1L);
    }

    @Test
    void testDeleteBook_NotFound() throws Exception {
        when(bookService.getBookById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/books/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetReviewByBookId() throws Exception {
        Review review = new Review("Great book!");
        when(reviewService.getReviewByBookId(1L)).thenReturn(review);

        mockMvc.perform(get("/api/books/1/review"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Great book!"));
                // .andExpect(jsonPath("$.rating").value(5));
    }
}
