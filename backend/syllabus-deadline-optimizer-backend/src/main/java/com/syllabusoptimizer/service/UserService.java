package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;


    // Register user
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Authenticate user
    public User authenticateUser(String usernameOrEmail, String password) {
        User user = userRepository.findByUsername(usernameOrEmail);
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }

        if (user != null) {
            return user;
        }
        return null;
    }
}
