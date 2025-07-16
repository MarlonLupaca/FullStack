package com.client_service.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {

    private String userCode;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String address;

}
