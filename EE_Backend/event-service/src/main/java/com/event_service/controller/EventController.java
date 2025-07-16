package com.event_service.controller;

import com.event_service.Service.EventService;
import com.event_service.dto.EventDTO;
import com.event_service.models.Event;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/events")
public class EventController {

    //:)
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable String id) {
        return eventService.findById(id).map(this::convertToDTO).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @PostMapping
    public EventDTO createEvent(@RequestBody EventDTO dto) {
        Event saved = eventService.save(convertToEntity(dto));
        return convertToDTO(saved);
    }

    @PutMapping("/{id}")
    public EventDTO updateEvent(@PathVariable String id, @RequestBody EventDTO dto) {
        Event event = convertToEntity(dto);
        event.setId(id);
        return convertToDTO(eventService.save(event));
    }

    @PatchMapping("/{id}/status")
    public EventDTO updateStatus(@PathVariable String id, @RequestBody String status) {
        return convertToDTO(eventService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteById(id);
    }

    private EventDTO convertToDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setDate(event.getDate());
        dto.setTime(event.getTime());
        dto.setStatus(event.getStatus());
        return dto;
    }

    private Event convertToEntity(EventDTO dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setStatus(dto.getStatus());
        return event;
    }
}
