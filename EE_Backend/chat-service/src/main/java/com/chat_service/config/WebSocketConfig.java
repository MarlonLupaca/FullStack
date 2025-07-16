package com.chat_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final HttpHandshakeInterceptor handshakeInterceptor;

    public WebSocketConfig(HttpHandshakeInterceptor handshakeInterceptor) {
        this.handshakeInterceptor = handshakeInterceptor;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/user"); // Habilita rutas públicas y privadas
        config.setUserDestinationPrefix("/user");     // Para rutas privadas como /user/xxx
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat")
                .setHandshakeHandler(handshakeHandler())  // <-- aquí se enlaza el principal
                .setAllowedOrigins("*")
                .addInterceptors(handshakeInterceptor);
    }

    @Bean
    public DefaultHandshakeHandler handshakeHandler() {
        return new DefaultHandshakeHandler() {
            @Override
            protected Principal determineUser(
                    ServerHttpRequest request,
                    WebSocketHandler wsHandler,
                    Map<String, Object> attributes
            ) {
                return (Principal) attributes.get("principal");
            }
        };
    }
}
