package com.example.demo.service;

import com.example.demo.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAllBooks();

    Optional<Book> getBookById(Long id);

    Book saveBook(Book book);

    void deleteBook(Long id);

    List<Book> getBooksRead(int progress);
}
