// src/main/java/com/syllabusoptimizer/repository/CourseRepository.java
package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}