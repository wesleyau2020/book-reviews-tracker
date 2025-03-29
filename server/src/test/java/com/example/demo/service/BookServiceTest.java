package com.example.demo.service;

import com.example.demo.model.Book;
import com.example.demo.service.impl.BookServiceImpl;
import com.example.demo.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    private Book book;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        book = new Book("Spring Boot in Action", "Craig Walls", 100);
    }

    @Test
    void testGetAllBooks() {
        // Arrange
        List<Book> books = Arrays.asList(book);
        when(bookRepository.findAll()).thenReturn(books);

        // Act
        List<Book> result = bookService.getAllBooks();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Spring Boot in Action", result.get(0).getTitle());
    }

    @Test
    void testGetBookById_found() {
        // Arrange
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        // Act
        Optional<Book> result = bookService.getBookById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Spring Boot in Action", result.get().getTitle());
    }

    @Test
    void testGetBookById_notFound() {
        // Arrange
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<Book> result = bookService.getBookById(1L);

        // Assert
        assertFalse(result.isPresent());
    }

    @Test
    void testSaveBook() {
        // Arrange
        when(bookRepository.save(book)).thenReturn(book);

        // Act
        Book savedBook = bookService.saveBook(book);

        // Assert
        assertNotNull(savedBook);
        assertEquals("Spring Boot in Action", savedBook.getTitle());
    }

    @Test
    void testDeleteBook() {
        // Arrange
        doNothing().when(bookRepository).deleteById(1L);

        // Act
        bookService.deleteBook(1L);

        // Assert
        verify(bookRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetBooksRead() {
        // Arrange
        List<Book> books = Arrays.asList(book);
        when(bookRepository.findByProgressGreaterThan(50)).thenReturn(books);

        // Act
        List<Book> result = bookService.getBooksRead(50);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Spring Boot in Action", result.get(0).getTitle());
    }
}
