package com.example.demo.service;

import com.example.demo.dto.ChatRequest;
import com.example.demo.dto.ChatResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatGptService {
    private static final Logger logger = LoggerFactory.getLogger(ChatGptService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    public String getRecommendations(String prompt) {
        // logger.info("Received prompt: {}", prompt);
        
        // Set request
        ChatRequest request = new ChatRequest(model, prompt);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // Set request body 
        HttpEntity<ChatRequest> entity = new HttpEntity<>(request, headers);
        logger.debug("Request body: {}", entity.getBody());
        
        ChatResponse response = null;
        try {
            // Make the API call
            response = restTemplate.postForObject(apiUrl, entity, ChatResponse.class);
            logger.info("Response received from OpenAI API");

        } catch (Exception e) {
            // Log the exception that occurred while making the API call
            logger.error("Exception occurred while calling OpenAI API: {}", e.getMessage(), e);
            return "Error: Failed to connect to OpenAI API";
        }

        if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
            logger.error("No response received from OpenAI API");
            return "No response";
        }

        String result = response.getChoices().get(0).getMessage().getContent();
        logger.info("Received response from OpenAI API: {}", result);
        return result;
    }
}
