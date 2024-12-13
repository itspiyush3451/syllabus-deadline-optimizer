// src/main/java/com/syllabusoptimizer/service/TopicService.java
package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

    // Get all topics
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Get a topic by ID
    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    // Save a new topic
    public Topic saveTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    // Update an existing topic
    public Topic updateTopic(Long id, Topic topicDetails) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found with id " + id));
        topic.setSubjectName(topicDetails.getSubjectName());
        topic.setEstimatedLectures(topicDetails.getEstimatedLectures());
        topic.setChapterSequence(topicDetails.getChapterSequence());
        topic.setDeadlineDate(topicDetails.getDeadlineDate());
        topic.setModules(topicDetails.getModules());
        return topicRepository.save(topic);
    }

    // Delete a topic
    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
    }
}