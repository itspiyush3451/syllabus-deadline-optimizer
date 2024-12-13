package com.syllabusoptimizer.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "estimated_lectures", nullable = false)
    private Integer estimatedLectures;

    @Column(name = "chapter_sequence", nullable = false)
    private Integer chapterSequence;

    @Column(name = "deadline_date", nullable = false)
    private LocalDate deadlineDate;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getEstimatedLectures() {
        return estimatedLectures;
    }

    public void setEstimatedLectures(Integer estimatedLectures) {
        this.estimatedLectures = estimatedLectures;
    }

    public Integer getChapterSequence() {
        return chapterSequence;
    }

    public void setChapterSequence(Integer chapterSequence) {
        this.chapterSequence = chapterSequence;
    }

    public LocalDate getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(LocalDate deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    // Override toString
    @Override
    public String toString() {
        return "Topic{" +
                "id=" + id +
                ", course=" + (course != null ? course.getId() : "null") +
                ", subjectName='" + subjectName + '\'' +
                ", estimatedLectures=" + estimatedLectures +
                ", chapterSequence=" + chapterSequence +
                ", deadlineDate=" + deadlineDate +
                '}';
    }

    // Override equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Topic topic)) return false;
        return id != null && id.equals(topic.id);
    }

    // Override hashCode
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}