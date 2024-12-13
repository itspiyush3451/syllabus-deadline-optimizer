// src/main/java/com/syllabusoptimizer/repository/TopicRepository.java
package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    // You can define custom query methods here if needed
}