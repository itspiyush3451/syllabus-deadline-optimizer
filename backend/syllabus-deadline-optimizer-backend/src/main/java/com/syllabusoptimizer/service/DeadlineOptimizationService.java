package com.syllabusoptimizer.service;

import com.syllabusoptimizer.model.Event;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Service
public class DeadlineOptimizationService {
    
    public List<Event> optimizeDeadlines(List<Event> events) {
        // Calculate complexity scores for each topic
        Map<Event, Double> complexityScores = calculateComplexityScores(events);
        
        // Sort events by complexity
        List<Event> sortedEvents = new ArrayList<>(events);
        sortedEvents.sort((e1, e2) -> 
            complexityScores.get(e2).compareTo(complexityScores.get(e1)));
        
        // Distribute deadlines based on complexity
        LocalDate startDate = LocalDate.now();
        int totalDays = 90; // Assuming a semester is 90 days
        double totalComplexity = complexityScores.values().stream().mapToDouble(Double::doubleValue).sum();
        
        int currentDay = 0;
        for (Event event : sortedEvents) {
            double complexityRatio = complexityScores.get(event) / totalComplexity;
            int daysForEvent = (int) (totalDays * complexityRatio);
            event.setDeadline(startDate.plusDays(currentDay + daysForEvent).toString());
            currentDay += daysForEvent;
        }
        
        return sortedEvents;
    }
    
    private Map<Event, Double> calculateComplexityScores(List<Event> events) {
        Map<Event, Double> scores = new HashMap<>();
        
        for (Event event : events) {
            double score = 0.0;
            
            // Factor 1: Number of subtopics
            score += event.getSubtopics().split(",").length * 0.3;
            
            // Factor 2: Estimated lectures
            score += event.getEstimatedLectures() * 0.2;
            
            // Factor 3: Course complexity (based on course name)
            if (event.getCourse().toLowerCase().contains("advanced")) {
                score += 2.0;
            } else if (event.getCourse().toLowerCase().contains("intermediate")) {
                score += 1.5;
            } else {
                score += 1.0;
            }
            
            // Factor 4: Topic complexity (based on topic name)
            if (event.getName().toLowerCase().contains("project") || 
                event.getName().toLowerCase().contains("research")) {
                score += 1.5;
            }
            
            scores.put(event, score);
        }
        
        return scores;
    }
} 