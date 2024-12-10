package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    // Create a new topic
    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        try {
            // Create the topic in the database using the service
            Topic createdTopic = topicService.createTopic(topic);

            // Return the created topic with a 201 status
            return new ResponseEntity<>(createdTopic, HttpStatus.CREATED);
        } catch (Exception e) {
            // If an error occurs, return a 400 status with an error message
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Get topics by course ID
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Topic>> getTopicsByCourseId(@PathVariable Long courseId) {
        try {
            List<Topic> topics = topicService.getTopicsByCourseId(courseId);
            if (topics.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(topics, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a topic by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable Long id) {
        try {
            Optional<Topic> topic = topicService.getTopicById(id);
            if (topic.isPresent()) {
                return new ResponseEntity<>(topic.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
