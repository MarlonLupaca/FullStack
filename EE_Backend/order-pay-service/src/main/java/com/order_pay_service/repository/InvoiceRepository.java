package com.order_pay_service.repository;

import com.order_pay_service.models.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    List<Invoice> findByCustomerUserCode(String userCode);
    boolean existsBySeriesNumber(String seriesNumber);
}