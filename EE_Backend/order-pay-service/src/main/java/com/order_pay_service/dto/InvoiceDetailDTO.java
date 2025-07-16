package com.order_pay_service.dto;

import lombok.Data;

@Data
public class InvoiceDetailDTO {
    private Integer productCode;
    private Integer quantity;
    private Double price;
}

