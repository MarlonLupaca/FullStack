package com.orchestrator_service.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthFeignResponse {

    private String userCode;

    private String username;

    private boolean active;

    private String rol;
}
