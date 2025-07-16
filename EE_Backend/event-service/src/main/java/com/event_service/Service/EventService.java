package com.event_service.Service;

import com.event_service.models.Event;
import com.event_service.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Optional<Event> findById(String id) {
        return eventRepository.findById(id);
    }

    public Event save(Event event) {
        // ✅ Generar el ID solo si es un nuevo evento (el ID es nulo o vacío)
        if (event.getId() == null || event.getId().isEmpty()) {
            String generatedId = generateEventId();
            event.setId(generatedId);
        }
        return eventRepository.save(event);
    }

    public void deleteById(String id) {
        eventRepository.deleteById(id);
    }

    public Event updateStatus(String id, String status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        return eventRepository.save(event);
    }

    private String generateEventId() {
        String year = String.valueOf(LocalDate.now().getYear());
        String randomPart = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        return "EVT-" + year + "-" + randomPart;
    }
}
