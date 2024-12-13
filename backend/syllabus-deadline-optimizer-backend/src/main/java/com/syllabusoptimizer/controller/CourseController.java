package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Course;
import com.syllabusoptimizer.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("http://127.0.0.1:5500")
public class CourseController {

    @Autowired
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Add a new course
    @PostMapping("/getCourse")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course createdCourse = courseService.saveCourse(course);
        return ResponseEntity.ok(createdCourse);
    }

    // Fetch all courses
    @GetMapping("/getCourse/all")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Fetch a course by ID
    @GetMapping("/getCourse/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id " + id));
    }

    // Update a course
    @PutMapping("/getCourse/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails) {
        Course updatedCourse = courseService.updateCourse(id, courseDetails);
        if (updatedCourse != null) {
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a course
    @DeleteMapping("/getCourse/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
            boolean isDeleted = courseService.deleteCourse(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}