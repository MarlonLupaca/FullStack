package com.chat_service.controllers;

import com.chat_service.entity.ChatMessageEntity;
import com.chat_service.entity.Ticket;
import com.chat_service.service.ChatMessageService;
import com.chat_service.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chatvivo")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    private final ChatMessageService chatMessageService;

    @GetMapping("/open")
    public List<Ticket> getOpenTickets() {
        return ticketService.findOpenTickets();
    }
    // Nuevo endpoint: mensajes por número de ticket
    @GetMapping("/mensajes/{ticketId}")
    public List<ChatMessageEntity> getMessagesByTicket(@PathVariable String ticketId) {
        return chatMessageService.findAllByTicket(ticketId);
    }

}