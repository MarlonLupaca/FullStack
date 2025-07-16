package com.chat_service.repository;

import com.chat_service.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, String> {
    List<Ticket> findByStatus(String status);
}
