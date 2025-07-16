package com.order_pay_service.repository;

import com.order_pay_service.modelsAcopl.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByCode(Integer code); // Optional if you're using code as business identifier
}
