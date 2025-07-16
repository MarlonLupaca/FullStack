package com.client_service.repository;

import com.client_service.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUserCode(String userCode);
    boolean existsByEmail(String email);
}
