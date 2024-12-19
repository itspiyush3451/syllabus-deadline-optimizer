package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://127.0.0.1:5500") // Adjust the origin if needed
public class TopicController {

    @Autowired
    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    // Add a new topic
    @PostMapping("/addTopic")
    public Topic addTopic(@RequestBody Map<String, Object> payload) {
        Topic topic = parseTopicFromPayload(payload);
        List<String> moduleNames = parseModuleNamesFromPayload(payload);
        return topicService.saveTopic(topic, moduleNames);
    }

    // Get all topics
    @GetMapping
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    // Get topic by ID
    @GetMapping("/{id}")
    public Optional<Topic> getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id);
    }

    // Update a topic
    @PutMapping("/{id}")
    public Topic updateTopic(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Topic topicDetails = parseTopicFromPayload(payload);
        List<String> moduleNames = parseModuleNamesFromPayload(payload);
        return topicService.updateTopic(id, topicDetails, moduleNames);
    }

    // Delete a topic
    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }

    // Helper: Parse Topic from the payload
    private Topic parseTopicFromPayload(Map<String, Object> payload) {
        Topic topic = new Topic();
        topic.setSubjectName((String) payload.get("subjectName"));
        topic.setChapterSequence((Integer) payload.get("chapterSequence"));
        topic.setEstimatedLectures((Integer) payload.get("estimatedLectures"));
        topic.setDeadlineDate(LocalDate.parse((String) payload.get("deadlineDate"))); // Adjust date parsing if necessary
        return topic;
    }

    // Helper: Parse module names from the payload
    private List<String> parseModuleNamesFromPayload(Map<String, Object> payload) {
        return (List<String>) payload.get("moduleNames");
    }
}
