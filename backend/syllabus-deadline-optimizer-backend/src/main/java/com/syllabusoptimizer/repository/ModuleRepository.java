// src/main/java/com/syllabusoptimizer/repository/ModuleRepository.java
package com.syllabusoptimizer.repository;

import com.syllabusoptimizer.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    // You can define custom query methods here if needed
}