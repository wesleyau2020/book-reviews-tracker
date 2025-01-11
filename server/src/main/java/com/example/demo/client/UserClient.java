package com.example.demo.client;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Configuration
public class UserClient {

    private final UserRepository userRepository;

    public UserClient(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public CommandLineRunner addDefaultUser() {
        return args -> {
            // Check if the user exists in the database
            String username = "admin@local.com";
            if (!userRepository.existsByUsername(username)) {
                User user = new User();
                user.setUsername(username);

                // Encrypt the password
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String encodedPassword = passwordEncoder.encode("password");
                user.setPassword(encodedPassword);

                // Save the user in the database
                userRepository.save(user);
                System.out.println("Default user added to the database: " + username);
            } else {
                System.out.println("User already exists: " + username);
            }
        };
    }
}
