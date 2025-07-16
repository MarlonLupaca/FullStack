package com.order_pay_service.controller;

import com.order_pay_service.dto.InvoiceRequestDTO;
import com.order_pay_service.models.Invoice;
import com.order_pay_service.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody InvoiceRequestDTO dto) {
        Invoice invoice = invoiceService.createInvoice(dto);
        return ResponseEntity.ok(invoice);
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        List<Invoice> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/by-user/{userCode}")
    public List<Invoice> getInvoicesByUserCode(@PathVariable String userCode) {
        return invoiceService.getInvoicesByUserCode(userCode);
    }
}
