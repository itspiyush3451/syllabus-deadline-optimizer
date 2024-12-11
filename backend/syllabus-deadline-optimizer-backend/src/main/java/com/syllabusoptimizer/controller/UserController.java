package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // Constructor-based dependency injection
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register user endpoint
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login user endpoint
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.authenticateUser(user.getEmail(), user.getPassword());
    }
}
