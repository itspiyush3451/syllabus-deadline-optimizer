// src/main/java/com/syllabusoptimizer/service/CourseService.java
package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Course;
import com.syllabusoptimizer.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get a course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Save a new course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // Update an existing course
    public Course updateCourse(Long id, Course courseDetails) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
        course.setName(courseDetails.getName());
        return courseRepository.save(course);
    }

    // Delete a course
    public boolean deleteCourse(Long id) {
        courseRepository.deleteById(id);
        return false;
    }
}