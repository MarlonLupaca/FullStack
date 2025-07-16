package com.orchestrator_service.client.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ClientRequest {

    private String Username;

    private String Password;

    private String rol;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String address;

}
