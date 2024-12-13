package com.syllabusoptimizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progress_tracking") // Table name in the database
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long topicId; // Assuming you have a topic ID to track progress
    private String userId; // Assuming you want to track progress per user
    private int completedLectures; // Number of completed lectures
    private int totalLectures; // Total number of lectures for the topic
    private String status; // Status of the progress (e.g., "In Progress", "Completed")

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getCompletedLectures() {
        return completedLectures;
    }

    public void setCompletedLectures(int completedLectures) {
        this.completedLectures = completedLectures;
    }

    public int getTotalLectures() {
        return totalLectures;
    }

    public void setTotalLectures(int totalLectures) {
        this.totalLectures = totalLectures;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}