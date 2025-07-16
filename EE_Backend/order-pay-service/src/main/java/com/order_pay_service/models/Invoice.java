package com.order_pay_service.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.order_pay_service.modelsAcopl.Customer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    private String seriesNumber;

    private LocalDateTime issuedAt;

    private String estate;

    private Double totalAmount;

    private String shippingAddress;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<InvoiceDetail> details;
}

