package com.client_service.service;

import com.client_service.dto.request.CustomerRequest;
import com.client_service.dto.request.CustomerUpdateRequest;
import com.client_service.dto.response.CustomerResponse;
import java.util.List;

public interface CustomerService {
    CustomerResponse createCustomer(CustomerRequest request);
    CustomerResponse getCustomerByUserCode(String userCode);
    List<CustomerResponse> getAllCustomers();
    public CustomerResponse updateCustomer(String userCode, CustomerUpdateRequest request);
}
