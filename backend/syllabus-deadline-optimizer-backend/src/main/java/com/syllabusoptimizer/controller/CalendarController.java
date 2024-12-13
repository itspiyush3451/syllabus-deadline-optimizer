package com.syllabusoptimizer.controller;

import com.syllabusoptimizer.model.Event;
import com.syllabusoptimizer.service.CalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = calendarService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = calendarService.createEvent(event);
        return ResponseEntity.status(201).body(createdEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        calendarService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}