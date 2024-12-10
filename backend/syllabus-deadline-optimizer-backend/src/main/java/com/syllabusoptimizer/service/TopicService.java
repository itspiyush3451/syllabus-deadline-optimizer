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

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public List<Topic> getTopicsByCourseId(Long courseId) {
        return topicRepository.findByCourseId(courseId);
    }

    public Optional<Topic> getTopicById(Long id) {
        return topicRepository.findById(id);
    }
}
