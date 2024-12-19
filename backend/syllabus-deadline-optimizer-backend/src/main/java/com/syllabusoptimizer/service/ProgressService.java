package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Progress;
import com.syllabusoptimizer.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class    ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    // Get all progress records for a user with completion percentages calculated
    public List<Progress> getUserProgress(Long userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);

        return progressList.stream().peek(progress -> {
            double completionPercentage = calculateCompletionPercentage(progress);
            progress.setCompletionPercentage(completionPercentage);
        }).collect(Collectors.toList());
    }

    // Calculate completion percentage
    private double calculateCompletionPercentage(Progress progress) {
        if (progress.getTopicLectures() == 0) {
            return 0.0; // Avoid division by zero
        }
        return (progress.getCompletedLectures() / (double) progress.getTopicLectures()) * 100;
    }
    // Save a progress record
    public Progress saveProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    // Get all progress records
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    // Get progress records by user ID
    public List<Progress> getProgressByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    // Get a specific progress record by ID
    public Optional<Progress> getProgressById(Long id) {
        return progressRepository.findById(id);
    }

    // Update a progress record
    public Progress updateProgress(Long id, Progress progressDetails) {
        Progress existingProgress = progressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Progress not found with ID: " + id));

        existingProgress.setCompletedLectures(progressDetails.getCompletedLectures());
        existingProgress.setStatus(progressDetails.getStatus());
        existingProgress.setTopicLectures(progressDetails.getTopicLectures());
//        existingProgress.setUserId(progressDetails.getUserId());

        return progressRepository.save(existingProgress);
    }

    // Delete a progress record
    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}
