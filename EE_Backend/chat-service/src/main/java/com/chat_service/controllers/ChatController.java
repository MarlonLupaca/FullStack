package com.chat_service.controllers;

import com.chat_service.dto.ChatMessage;
import com.chat_service.dto.ChatPreviewRequest;
import com.chat_service.dto.UserSessionDTO;
import com.chat_service.entity.ChatMessageEntity;
import com.chat_service.entity.Ticket;
import com.chat_service.repository.ChatMessageRepository;
import com.chat_service.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Optional;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private TicketService ticketService;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // Envío de mensajes del cliente
    @MessageMapping("/send")
    public void handleClientMessage(@Payload ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
        UserSessionDTO session = (UserSessionDTO) headerAccessor.getSessionAttributes().get("userSession");

        if (session == null) {
            throw new RuntimeException("No se pudo identificar al usuario.");
        }

        Optional<Ticket> optionalTicket = ticketService.findById(session.getTicket());

        if (optionalTicket.isEmpty()) {
            throw new RuntimeException("Ticket no encontrado.");
        }

        Ticket ticket = optionalTicket.get();

        ChatMessageEntity savedMessage = chatMessageRepository.save(
                ChatMessageEntity.builder()
                        .content(message.getContent())
                        .timestamp(LocalDateTime.now())
                        .loger(session.getUsername())
                        .ticket(ticket)
                        .build()
        );

        ticket.setLastMessage(message.getContent());
        ticketService.save(ticket);

        ChatMessage finalMessage = ChatMessage.builder()
                .messageId(String.valueOf(savedMessage.getId()))
                .numeroTicket(ticket.getId())
                .sender(session.getUsername())
                .content(savedMessage.getContent())
                .type(message.getType())
                .timestamp(savedMessage.getTimestamp())
                .build();

        messagingTemplate.convertAndSend("/topic/ticket/" + ticket.getId(), finalMessage);

        ChatPreviewRequest preview = ChatPreviewRequest.builder()
                .ticketId(ticket.getId())
                .customerName(session.getUsername())
                .customerEmail(session.getEmail())
                .lastMessageContent(message.getContent())
                .lastMessageTimestamp(finalMessage.getTimestamp())
                .build();

        messagingTemplate.convertAndSend("/topic/globalChat", preview);
    }

    // Envío de mensajes del administrador
    @MessageMapping("/admin-send")
    public void handleAdminMessage(@Payload ChatMessage message) {
        String ticketId = message.getNumeroTicket();
        System.out.println("👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻👨‍💻 P" + ticketId);
        Optional<Ticket> optionalTicket = ticketService.findById(ticketId);

        if (optionalTicket.isEmpty()) {
            throw new RuntimeException("Ticket no encontrado para el admin.");
        }

        Ticket ticket = optionalTicket.get();

        ChatMessageEntity savedMessage = chatMessageRepository.save(
                ChatMessageEntity.builder()
                        .content(message.getContent())
                        .timestamp(LocalDateTime.now())
                        .loger("admin")
                        .ticket(ticket)
                        .build()
        );

        ticket.setLastMessage(message.getContent());
        ticketService.save(ticket);

        ChatMessage finalMessage = ChatMessage.builder()
                .messageId(String.valueOf(savedMessage.getId()))
                .numeroTicket(ticket.getId())
                .sender("admin")
                .content(savedMessage.getContent())
                .type(message.getType())
                .timestamp(savedMessage.getTimestamp())
                .build();

        messagingTemplate.convertAndSend("/topic/ticket/" + ticket.getId(), finalMessage);

        ChatPreviewRequest preview = ChatPreviewRequest.builder()
                .ticketId(ticket.getId())
                .customerName(ticket.getCustomerName())
                .customerEmail(ticket.getCustomerEmail())
                .lastMessageContent(message.getContent())
                .lastMessageTimestamp(finalMessage.getTimestamp())
                .build();

        messagingTemplate.convertAndSend("/topic/globalChat", preview);
    }

    @MessageMapping("/view")
    public void handlePreview(SimpMessageHeaderAccessor headerAccessor) {
        UserSessionDTO session = (UserSessionDTO) headerAccessor.getSessionAttributes().get("userSession");

        if (session == null) {
            throw new RuntimeException("No hay sesión de usuario");
        }

        ChatPreviewRequest preview = ChatPreviewRequest.builder()
                .ticketId(session.getTicket())
                .customerName(session.getUsername())
                .customerEmail(session.getEmail())
                .lastMessageContent("Nuevo chat iniciado")
                .lastMessageTimestamp(LocalDateTime.now())
                .build();

        messagingTemplate.convertAndSend("/topic/globalChat", preview);
    }
}
