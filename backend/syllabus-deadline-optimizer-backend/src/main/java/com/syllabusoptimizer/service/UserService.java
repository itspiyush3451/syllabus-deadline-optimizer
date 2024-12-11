package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user); // Save user to the database
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register new user
    public User registerUser(String username, String email, String password) {
        // Check if username or email already exists
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username is already taken");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already taken");
        }

        // Encode the password
       String encodedPassword = passwordEncoder.encode(password);

        // Create a new User object
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodedPassword);

        // Save the user to the database
        return userRepository.save(user);
    }

    // Find user by username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
