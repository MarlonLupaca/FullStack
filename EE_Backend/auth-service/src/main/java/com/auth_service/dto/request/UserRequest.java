package com.auth_service.dto.request;

import lombok.Data;

@Data
public class UserRequest {

    private String username;

    private String password;

    private String rol;

}
