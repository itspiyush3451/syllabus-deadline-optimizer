package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Progress;
import com.syllabusoptimizer.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping
    public ResponseEntity<List<Progress>> getAllProgress() {
        List<Progress> progressList = progressService.getAllProgress();
        return ResponseEntity.ok(progressList);
    }

    @PostMapping
    public ResponseEntity<Progress> createProgress(@RequestBody Progress progress) {
        Progress createdProgress = progressService.createProgress(progress);
        return ResponseEntity.status(201).body(createdProgress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Progress> updateProgress(@PathVariable Long id, @RequestBody Progress progress) {
        Progress updatedProgress = progressService.updateProgress(id, progress);
        return ResponseEntity.ok(updatedProgress);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Progress>> getProgressByUserId(@PathVariable String userId) {
        List<Progress> userProgress = progressService.getProgressByUserId(userId);
        return ResponseEntity.ok(userProgress);
    }
}