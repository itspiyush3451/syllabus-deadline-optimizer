package com.syllabusoptimizer.model;

import jakarta.persistence.*;

@Entity
@Table(name = "modules")
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(nullable = false)
    private String name; // Renamed field for consistency

//    @Column(nullable = false)
    private Integer estimatedLectures; // Added field for lecture allocation

    @ManyToOne
//    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getEstimatedLectures() {
        return estimatedLectures;
    }

    public void setEstimatedLectures(Integer estimatedLectures) {
        this.estimatedLectures = estimatedLectures;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
}
