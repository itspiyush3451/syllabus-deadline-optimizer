package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.User;
import com.syllabusoptimizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://127.0.0.1:5500")
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
        System.out.println(user);
        return userService.registerUser(user);
    }

    // Login user endpoint
    @PostMapping("/login")
    public User login(@RequestBody User user, HttpSession session) {
        User authenticatedUser = userService.authenticateUser(user.getUsername(), user.getPassword());
        if (authenticatedUser != null) {
            session.setAttribute("user", authenticatedUser); // Store user in session
            return authenticatedUser;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate(); // Clear session data
    }

//    @GetMapping("/session")
//    public ResponseEntity<User> getSessionUser(HttpServletRequest request, HttpServletResponse response) {
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        // Retrieve the current session, if it exists
//        HttpSession session = request.getSession(false);
//
//        if (session != null) {
//            // Get the user attribute from the session
//            User user = (User) session.getAttribute("user");
//
//            if (user != null) {
//                // Return the user if present in the session
//                return ResponseEntity.ok(user);
//            }
//        }
//        // Return 401 Unauthorized if session or user is not found
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//    }


}
