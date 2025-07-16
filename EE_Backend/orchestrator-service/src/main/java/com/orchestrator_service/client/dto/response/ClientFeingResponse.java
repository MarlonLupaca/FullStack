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
public class ClientFeingResponse {

    private String userCode;

    private String fullName;

    private String email;

    private String phoneNumber;

    private LocalDate registrationDate;

    private Integer purchaseCount;

    private Double totalSpent;

    private String address;
}
