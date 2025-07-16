package com.order_pay_service.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InvoiceRequestDTO {
    private String customerCode;
    private String shippingAddress;
    private String estate;
    private Double totalAmount;
    private List<InvoiceDetailDTO> details;
}
