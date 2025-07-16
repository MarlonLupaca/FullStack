package com.chat_service.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSessionDTO {

    private String email;
    private String username;
    private String ticket;
    private String rol;
}
