package com.order_pay_service.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.order_pay_service.modelsAcopl.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invoice_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private Double unitPrice;

    private Double subtotal;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonBackReference
    private Invoice invoice;
}

