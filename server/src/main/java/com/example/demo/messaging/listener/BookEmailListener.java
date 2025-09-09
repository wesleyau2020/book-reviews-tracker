package com.example.demo.messaging.listener;

import com.example.demo.model.Book;
import com.example.demo.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class BookEmailListener {

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveBookMessage(Book book) {
        System.out.println("Received book: " + book.getTitle());
    }
}
