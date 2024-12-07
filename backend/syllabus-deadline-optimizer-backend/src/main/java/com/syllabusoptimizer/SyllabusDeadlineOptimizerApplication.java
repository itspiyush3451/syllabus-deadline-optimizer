package com.syllabusoptimizer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.syllabusoptimizer.model")
public class SyllabusDeadlineOptimizerApplication {
    public static void main(String[] args) {
        SpringApplication.run(SyllabusDeadlineOptimizerApplication.class, args);
    }
}
