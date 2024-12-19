package com.syllabusoptimizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "progress_tracking")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "completed_lectures", nullable = false)
    private int completedLectures;

    @Column(name = "topic_lectures", nullable = false)
    private int topicLectures;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Transient
    private double completionPercentage; // Calculated field, not stored in DB

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getCompletedLectures() {
        return completedLectures;
    }

    public void setCompletedLectures(int completedLectures) {
        this.completedLectures = completedLectures;
    }

    public int getTopicLectures() {
        return topicLectures;
    }

    public void setTopicLectures(int topicLectures) {
        this.topicLectures = topicLectures;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
}
