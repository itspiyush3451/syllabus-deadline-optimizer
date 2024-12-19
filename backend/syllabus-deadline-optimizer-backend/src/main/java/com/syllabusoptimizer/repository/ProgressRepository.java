package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Long> {
    // Find progress records by user ID
    List<Progress> findByUserId(Long userId);
}
