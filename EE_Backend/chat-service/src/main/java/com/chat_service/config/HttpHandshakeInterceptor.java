package com.chat_service.config;

import com.chat_service.dto.UserSessionDTO;
import com.chat_service.entity.Ticket;
import com.chat_service.service.TicketService;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class HttpHandshakeInterceptor implements HandshakeInterceptor {

    private TicketService ticketService;

    public HttpHandshakeInterceptor(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes
    ) {
        URI uri = request.getURI();
        String query = uri.getQuery();

        Map<String, String> paramMap = new HashMap<>();
        if (query != null) {
            for (String param : query.split("&")) {
                String[] pair = param.split("=");
                if (pair.length == 2) {
                    String key = URLDecoder.decode(pair[0], StandardCharsets.UTF_8);
                    String value = URLDecoder.decode(pair[1], StandardCharsets.UTF_8);
                    paramMap.put(key, value);
                }
            }
        }

        String email = paramMap.get("email");
        String username = paramMap.get("username");
        String rol = paramMap.get("rol");

        if (email == null || username == null) {
            System.out.println("❌ Faltan parámetros email o username");
            return false;
        }

        // ✅ Generar el ticket aquí
        String ticketId = "TCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        UserSessionDTO session = UserSessionDTO.builder()
                .email(email)
                .username(username)
                .ticket(ticketId)
                .rol(rol)
                .build();

        attributes.put("userSession", session);
        attributes.put("principal", (Principal) () -> email);


        if (!rol.equals("ADMIN")){
            Ticket ticket = Ticket.builder()
                    .id(ticketId)
                    .customerName(username)
                    .customerEmail(email)
                    .status("OPEN")
                    .createdAt(LocalDateTime.now())
                    .build();

            ticketService.save(ticket);
        }



        System.out.println("✅ Sesión creada para: " + email + " con ticket: " + ticketId);
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request,
                               ServerHttpResponse response,
                               WebSocketHandler wsHandler,
                               Exception exception) {
        // No se necesita lógica adicional
    }
}
