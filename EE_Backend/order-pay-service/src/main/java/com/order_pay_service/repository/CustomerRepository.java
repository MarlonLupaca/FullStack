package com.order_pay_service.repository;

import com.order_pay_service.modelsAcopl.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<com.order_pay_service.modelsAcopl.Customer, Long> {
    Customer findByUserCode(String userCode);
}
