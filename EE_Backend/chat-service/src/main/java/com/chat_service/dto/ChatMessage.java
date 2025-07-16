package com.chat_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatMessage {

    private String messageId;          // generado por backend al guardar
    private String sender;             // se llena en backend
    private String content;            // lo manda frontend
    private String numeroTicket;
    private String type;               // ej: "CHAT"
    private LocalDateTime timestamp;   // generado por backend
}
