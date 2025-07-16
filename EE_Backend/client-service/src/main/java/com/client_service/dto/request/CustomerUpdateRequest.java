package com.client_service.dto.request;

import lombok.Data;

@Data
public class CustomerUpdateRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
}
