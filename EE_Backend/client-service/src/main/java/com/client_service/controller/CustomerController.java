package com.client_service.controller;


import com.client_service.dto.request.CustomerRequest;
import com.client_service.dto.request.CustomerUpdateRequest;
import com.client_service.dto.response.CustomerResponse;
import com.client_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Registrar un nuevo cliente
    @PostMapping
    public ResponseEntity<CustomerResponse> registerCustomer(@RequestBody CustomerRequest request) {
        try {
            CustomerResponse response = customerService.createCustomer(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Obtener cliente por código de usuario
    @GetMapping("/{userCode}")
    public ResponseEntity<CustomerResponse> getCustomer(@PathVariable String userCode) {
        try {
            CustomerResponse response = customerService.getCustomerByUserCode(userCode);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Listar todos los clientes
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @PutMapping("/update/{userCode}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable String userCode,
            @RequestBody CustomerUpdateRequest request) {
        try {
            CustomerResponse response = customerService.updateCustomer(userCode, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
