package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Subtopic;
import com.syllabusoptimizer.service.SubtopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtopics")
public class SubtopicController {

    @Autowired
    private SubtopicService subtopicService;

    @GetMapping("/topic/{topicId}")
    public List<Subtopic> getSubtopicsByTopic(@PathVariable Long topicId) {
        return subtopicService.getSubtopicsByTopicId(topicId);
    }

    @PostMapping
    public Subtopic createSubtopic(@RequestBody Subtopic subtopic) {
        return subtopicService.createSubtopic(subtopic);
    }
}
