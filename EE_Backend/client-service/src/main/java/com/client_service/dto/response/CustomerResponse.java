package com.client_service.dto.response;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {
    private String userCode;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private LocalDate registrationDate;
    private Integer purchaseCount;
    private Double totalSpent;
}
