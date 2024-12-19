package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    // Additional query methods can be added here if needed
}
