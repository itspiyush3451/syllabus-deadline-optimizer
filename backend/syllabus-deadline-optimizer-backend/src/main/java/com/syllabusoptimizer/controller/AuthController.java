package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.service.UserService;
import com.syllabusoptimizer.model.LoginRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register endpoint
    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        User user = userService.registerUser(username, email, password);
        return "User registered successfully: " + user.getUsername();
    }

    // Login endpoint
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        // Find the user by username
        User user = userService.getUserByUsername(loginRequest.getUsername());

        // Check if user exists and validate the password
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return "Login successful!";
        }

        // If invalid credentials, throw an exception
        throw new RuntimeException("Invalid credentials");
    }
}
