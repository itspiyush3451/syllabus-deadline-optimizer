package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.LoginRequest;
import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Injecting passwordEncoder

    // Method to register user
    @PostMapping("/register")
    public String registerUser(@RequestParam String username,
                               @RequestParam String email,
                               @RequestParam String password) {
        // Encrypt the password before saving it
        String encryptedPassword = passwordEncoder.encode(password);

        User user = new User(username, email, encryptedPassword);
        userService.save(user);

        return "User registered successfully!";
    } @Autowired




    // Login user
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        // Retrieve user by username (or email)
        User user = userService.getUserByUsername(loginRequest.getUsername());

        // Check if the user exists and if the password matches
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        }

        // If credentials are invalid, return a 401 Unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

}
