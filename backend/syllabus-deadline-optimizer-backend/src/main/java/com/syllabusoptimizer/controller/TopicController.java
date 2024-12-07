package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    // Get all topics
    @GetMapping
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    // Get a topic by ID
    @GetMapping("/{id}")
    public Optional<Topic> getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id);
    }

    // Add or update a topic
    @PostMapping
    public Topic saveTopic(@RequestBody Topic topic) {
        return topicService.saveTopic(topic);
    }

    // Delete a topic
    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }
}
