package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Progress;
import com.syllabusoptimizer.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin("http://127.0.0.1:5500")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Add a new progress record
    @PostMapping
    public Progress addProgress(@RequestBody Progress progress) {
        return progressService.saveProgress(progress);
    }

    // Get all progress records
    @GetMapping
    public List<Progress> getAllProgress() {
        return progressService.getAllProgress();
    }

    // Get progress records by user ID
    @GetMapping("/user/{userId}")
    public List<Progress> getProgressByUserId(@PathVariable Long userId) {
        return progressService.getProgressByUserId(userId);
    }

    // Get a specific progress record by ID
    @GetMapping("/{id}")
    public Optional<Progress> getProgressById(@PathVariable Long id) {
        return progressService.getProgressById(id);
    }

    // Update a progress record
    @PutMapping("/{id}")
    public Progress updateProgress(@PathVariable Long id, @RequestBody Progress progressDetails) {
        return progressService.updateProgress(id, progressDetails);
    }

    // Delete a progress record
    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
    }
}
