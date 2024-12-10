package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    // Custom query method
    List<Topic> findByCourseId(Long courseId);
}
