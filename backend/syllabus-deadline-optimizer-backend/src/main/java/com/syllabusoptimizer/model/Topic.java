package com.syllabusoptimizer.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer chapterSequence;

    private LocalDate deadlineDate;

    private Integer estimatedLectures;

    private String subjectName;

    @ManyToOne
//    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules = new ArrayList<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getEstimatedLectures() {
        return estimatedLectures;
    }

    public void setEstimatedLectures(Integer estimatedLectures) {
        this.estimatedLectures = estimatedLectures;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    // Utility Methods
    public void addModule(Module module) {
        modules.add(module);
        module.setTopic(this);
    }

    public void removeModule(Module module) {
        modules.remove(module);
        module.setTopic(null);
    }
}
