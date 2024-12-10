package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // Simulate user registration (in reality, you'd save this to the database)
    public void register(User user) {
        // Logic for saving user to the database
        // For example: userRepository.save(user);
    }

    // Simulate user login (in reality, you'd verify credentials from the database)
    public boolean login(User user) {
        // Logic to check user credentials (compare with stored values)
        return user.getUsername().equals("testuser") && user.getPassword().equals("testpassword");
    }
}
