package com.example.demo.service;

import com.example.demo.config.RabbitMQConfig;
import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookProgressScheduler {

    private final BookRepository bookRepository;
    private final RabbitTemplate rabbitTemplate;

    public BookProgressScheduler(BookRepository bookRepository, RabbitTemplate rabbitTemplate) {
        this.bookRepository = bookRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduleEmailJobs() {
        List<Book> ongoingBooks = bookRepository.findByCompletionDateIsNullAndProgressGreaterThan(0);

        System.out.println("Scheduling email jobs for books:");

        for (Book book : ongoingBooks) {
            System.out.println("Sending to queue: " + book.getTitle());
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, book);
        }
    }
}