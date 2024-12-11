package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    // Login user
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        String usernameOrEmail = loginRequest.getEmail(); // Assuming `email` field is used for usernameOrEmail
        String password = loginRequest.getPassword();

        return userService.authenticateUser(usernameOrEmail, password);
    }
}
