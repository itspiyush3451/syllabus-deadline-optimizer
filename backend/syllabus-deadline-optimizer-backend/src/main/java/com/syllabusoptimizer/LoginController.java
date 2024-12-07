package com.syllabusoptimizer;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        // For demonstration purposes, we're checking hardcoded values.
        if ("testuser".equals(loginRequest.getUsername()) && "testpassword".equals(loginRequest.getPassword())) {
            return "Login successful!";
        } else {
            return "Invalid credentials!";
        }
    }
}
