package com.client_service.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @Column(name = "user_code", unique = true, nullable = false, length = 12)
    private String userCode;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;

    @Column(name = "purchase_count", nullable = false)
    private int purchaseCount;

    @Column(name = "total_spent", nullable = false)
    private Double totalSpent;

    @Column(name = "address")
    private String address;
}
