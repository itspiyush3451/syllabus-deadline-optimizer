package com.syllabusoptimizer.model;

public class User {
    private String username;
    private String password;

    // Default constructor
    public User() {
    }

    // Constructor with parameters
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getter and setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
