package com.chat_service.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    private String id; // Generado en el interceptor, ej: TCK-XXXX

    private String customerName;
    private String customerEmail;

    private String status; // Ej: OPEN, CLOSED

    private LocalDateTime createdAt;

    private String lastMessage;

    @JsonManagedReference
    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatMessageEntity> messages = new ArrayList<>();
}
