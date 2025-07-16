package com.order_pay_service.service;

import com.order_pay_service.dto.InvoiceRequestDTO;
import com.order_pay_service.models.Invoice;

import java.util.List;

public interface InvoiceService {
    List<Invoice> getInvoicesByUserCode(String userCode);
    Invoice createInvoice(InvoiceRequestDTO dto);
    List<Invoice> getAllInvoices();
}
