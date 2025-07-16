package com.chat_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ChatPreviewRequest {
    private String ticketId;
    private String customerName;
    private String customerEmail;
    private String lastMessageContent;
    private LocalDateTime lastMessageTimestamp;
}
