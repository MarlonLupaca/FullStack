package com.chat_service.controllers;

import com.chat_service.dto.UserSessionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class InitController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/init")
    public void handleInit(SimpMessageHeaderAccessor headerAccessor) {

        UserSessionDTO session = (UserSessionDTO) headerAccessor.getSessionAttributes().get("userSession");

        System.out.println("📩 Init recibido de: " + session.getEmail());
        System.out.println("✅ Principal asociado: " + session.getUsername());
        System.out.println("📤 Enviando ticket desde /app/init a: " + session.getTicket());

        String fallbackDestination = "/topic/ticket/" + session.getEmail().replace("@", "_at_");
        messagingTemplate.convertAndSend(fallbackDestination, session.getTicket());

    }
}
