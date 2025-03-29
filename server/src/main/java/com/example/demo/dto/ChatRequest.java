package com.example.demo.dto;

import java.util.Collections;
import java.util.List;

public class ChatRequest {
    private String model;
    private List<Message> messages;

    public ChatRequest(String model, String prompt) {
        this.model = model;
        this.messages = Collections.singletonList(new Message("user", prompt));
    }

    public String getModel() { return model; }
    public List<Message> getMessages() { return messages; }
}
