package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    // You can add custom query methods here if needed
}