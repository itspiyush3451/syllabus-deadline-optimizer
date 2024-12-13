package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.service.TopicService;
import com.syllabusoptimizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://127.0.0.1:5500")
@RequestMapping("/api/topics")
public class TopicController {
    private TopicService topicService;
    @Autowired
    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    // Add a new topic
    @PostMapping("/addTopic")
    public Topic addTopic(@RequestBody Topic topic) {
        return topicService.saveTopic(topic);
    }

    // Fetch all topics
    @GetMapping("/allTopics")
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    // Fetch a topic by ID
    @GetMapping("/{id}")
    public Topic getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found with id " + id));
    }

    // Update a topic
    @PutMapping("/{id}")
    public Topic updateTopic(@PathVariable Long id, @RequestBody Topic topicDetails) {
        return topicService.updateTopic(id, topicDetails);
    }

    // Delete a topic
    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }
}