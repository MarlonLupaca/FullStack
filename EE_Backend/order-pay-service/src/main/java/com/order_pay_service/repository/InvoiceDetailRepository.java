package com.order_pay_service.repository;

import com.order_pay_service.models.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail, Long> {
    // Optional: methods to find details by invoice, etc.
}
