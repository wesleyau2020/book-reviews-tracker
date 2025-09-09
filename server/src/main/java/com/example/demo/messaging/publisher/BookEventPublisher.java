package com.example.demo.messaging.publisher;

import com.example.demo.model.Book;
import com.example.demo.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public BookEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishBookCreated(Book book) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.ROUTING_KEY,
                book);

        System.out.println("Published new book event: " + book.getTitle());
    }
}
