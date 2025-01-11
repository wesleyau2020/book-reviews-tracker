package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "completion_date")
public class CompletionDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private String date; // This will be stored in DD/MM/YYYY format

    // No-argument constructor
    public CompletionDate() {
    }

    // Constructor
    public CompletionDate(Book book, String date) {
        this.book = book;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    // Utility method to parse the date from DD/MM/YYYY format
    public static LocalDate parseDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return LocalDate.parse(date, formatter);
    }
}
