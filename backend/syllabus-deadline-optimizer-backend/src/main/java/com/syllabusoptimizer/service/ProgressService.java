package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Progress;
import com.syllabusoptimizer.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }

    public Progress updateProgress(Long id, Progress progress) {
        progress.setId(id);
        return progressRepository.save(progress);
    }

    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }

    public List<Progress> getProgressByUserId(String userId) {
        // Custom method to find progress by user ID
        return progressRepository.findAll().stream()
                .filter(progress -> progress.getUserId().equals(userId))
                .toList();
    }
}