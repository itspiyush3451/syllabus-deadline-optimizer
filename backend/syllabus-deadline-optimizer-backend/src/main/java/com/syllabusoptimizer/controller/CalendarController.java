package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Event;
import com.syllabusoptimizer.service.CalendarService;
import com.syllabusoptimizer.service.DeadlineOptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class CalendarController {
    private final CalendarService calendarService;
    private final DeadlineOptimizationService deadlineOptimizationService;
    private final SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    public CalendarController(
            CalendarService calendarService,
            DeadlineOptimizationService deadlineOptimizationService,
            SimpMessagingTemplate messagingTemplate) {
        this.calendarService = calendarService;
        this.deadlineOptimizationService = deadlineOptimizationService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    @Cacheable(value = "events")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = calendarService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    @Cacheable(value = "events", key = "#id")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        Event event = calendarService.getEvent(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    @CacheEvict(value = "events", allEntries = true)
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = calendarService.createEvent(event);
        messagingTemplate.convertAndSend("/topic/events", createdEvent);
        return ResponseEntity.status(201).body(createdEvent);
    }

    @PutMapping("/{id}")
    @CacheEvict(value = "events", allEntries = true)
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event updatedEvent = calendarService.updateEvent(id, event);
        messagingTemplate.convertAndSend("/topic/events", updatedEvent);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{id}")
    @CacheEvict(value = "events", allEntries = true)
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        calendarService.deleteEvent(id);
        messagingTemplate.convertAndSend("/topic/events", "Event deleted: " + id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/optimize")
    @CacheEvict(value = "events", allEntries = true)
    public ResponseEntity<List<Event>> optimizeDeadlines() {
        List<Event> events = calendarService.getAllEvents();
        List<Event> optimizedEvents = deadlineOptimizationService.optimizeDeadlines(events);
        
        // Save optimized events
        for (Event event : optimizedEvents) {
            calendarService.updateEvent(event.getId(), event);
        }
        
        messagingTemplate.convertAndSend("/topic/events", "Deadlines optimized");
        return ResponseEntity.ok(optimizedEvents);
    }
}