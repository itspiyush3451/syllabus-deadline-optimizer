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

    // Save a course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);

    }

    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get a course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Update a course
    public Course updateCourse(Long id, Course courseDetails) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));

        // Update course fields
//        existingCourse.setName(courseDetails.getName());
//        existingCourse.setStartDate(courseDetails.getStartDate());
//        existingCourse.setEndDate(courseDetails.getEndDate());

        return courseRepository.save(existingCourse);
    }

    // Delete a course
    public boolean deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found with ID: " + id);
        }
        courseRepository.deleteById(id);
        return false;
    }
}
