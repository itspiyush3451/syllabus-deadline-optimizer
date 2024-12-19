package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Module;
import com.syllabusoptimizer.model.Topic;
import com.syllabusoptimizer.repository.ModuleRepository;
import com.syllabusoptimizer.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    // Save a topic with its modules
    @Transactional
    public Topic saveTopic(Topic topic, List<String> moduleNames) {
        validateTopicData(topic, moduleNames);

        distributeLecturesAcrossModules(topic, moduleNames);

        // Save the topic along with its modules
        return topicRepository.save(topic);
    }

    // Get all topics
    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    // Get a topic by ID
    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }

    // Update a topic
    @Transactional
    public Topic updateTopic(Long id, Topic topicDetails, List<String> moduleNames) {
        Topic existingTopic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found with ID: " + id));

        validateTopicData(topicDetails, moduleNames);

        updateTopicFields(existingTopic, topicDetails);

        // Clear existing modules and add updated ones
        moduleRepository.deleteAll(existingTopic.getModules());
        existingTopic.getModules().clear();
        distributeLecturesAcrossModules(existingTopic, moduleNames);

        return topicRepository.save(existingTopic);
    }

    // Delete a topic
    @Transactional
    public void deleteTopic(Long id) {
        Topic topic = topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found with ID: " + id));
        moduleRepository.deleteAll(topic.getModules());
        topicRepository.deleteById(id);
    }

    // Helper: Validate topic data and module names
    private void validateTopicData(Topic topic, List<String> moduleNames) {
        if (topic == null || topic.getEstimatedLectures() <= 0) {
            throw new IllegalArgumentException("Topic data is invalid. Estimated lectures must be positive.");
        }
        if (moduleNames == null || moduleNames.isEmpty()) {
            throw new IllegalArgumentException("Module names cannot be null or empty.");
        }
    }

    // Helper: Distribute lectures across modules
    private void distributeLecturesAcrossModules(Topic topic, List<String> moduleNames) {
        int totalModules = moduleNames.size();
        int baseLectures = topic.getEstimatedLectures() / totalModules;
        int remainingLectures = topic.getEstimatedLectures() % totalModules;

        List<Module> modules = new ArrayList<>();
        for (int i = 0; i < totalModules; i++) {
            Module module = new Module();
            module.setName(moduleNames.get(i));
            module.setTopic(topic);
            module.setEstimatedLectures(baseLectures + (i < remainingLectures ? 1 : 0));
            modules.add(module);
        }
        topic.setModules(modules);
    }

    // Helper: Update topic fields
    private void updateTopicFields(Topic existingTopic, Topic topicDetails) {
        existingTopic.setChapterSequence(topicDetails.getChapterSequence());
        existingTopic.setDeadlineDate(topicDetails.getDeadlineDate());
        existingTopic.setEstimatedLectures(topicDetails.getEstimatedLectures());
        existingTopic.setSubjectName(topicDetails.getSubjectName());
    }
}
