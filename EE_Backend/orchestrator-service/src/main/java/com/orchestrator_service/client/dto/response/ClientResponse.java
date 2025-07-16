package com.orchestrator_service.client.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ClientResponse {

    private String usercode;

    private String username;

    private boolean active;

    private String rol;

    private String fullname;

    private String email;

    private String phoneNumber;

    private LocalDate registrationDate;

    private Integer purchaseCount;

    private Double totalSpent;

    private String address;

}
