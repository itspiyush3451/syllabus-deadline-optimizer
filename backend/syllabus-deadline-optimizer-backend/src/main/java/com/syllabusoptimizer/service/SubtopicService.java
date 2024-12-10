package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Subtopic;
import com.syllabusoptimizer.repository.SubtopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubtopicService {

    @Autowired
    private SubtopicRepository subtopicRepository;

    public List<Subtopic> getSubtopicsByTopicId(Long topicId) {
        return subtopicRepository.findByTopicId(topicId);
    }

    public Subtopic createSubtopic(Subtopic subtopic) {
        return subtopicRepository.save(subtopic);
    }
}
