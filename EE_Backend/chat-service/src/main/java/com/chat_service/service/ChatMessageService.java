package com.chat_service.service;

import com.chat_service.entity.ChatMessageEntity;
import com.chat_service.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageEntity save(ChatMessageEntity message) {
        return chatMessageRepository.save(message);
    }

    public Optional<ChatMessageEntity> findById(Long id) {
        return chatMessageRepository.findById(id);
    }

    public List<ChatMessageEntity> findAll() {
        return chatMessageRepository.findAll();
    }

    public void deleteById(Long id) {
        chatMessageRepository.deleteById(id);
    }

    public List<ChatMessageEntity> findAllByTicket(String ticketId) {
        return chatMessageRepository.findByTicket_Id(ticketId);
    }


}
