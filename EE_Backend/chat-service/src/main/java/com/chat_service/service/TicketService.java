package com.chat_service.service;

import com.chat_service.entity.Ticket;
import com.chat_service.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }


    public Optional<Ticket> findById(String id) {
        return ticketRepository.findById(id);
    }

    public Ticket update(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public void deleteById(String id) {
        ticketRepository.deleteById(id);
    }

    public List<Ticket> findOpenTickets() {
        return ticketRepository.findByStatus("OPEN");
    }
}

