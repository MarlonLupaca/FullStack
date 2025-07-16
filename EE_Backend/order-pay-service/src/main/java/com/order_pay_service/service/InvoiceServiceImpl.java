package com.order_pay_service.service;

import com.order_pay_service.dto.InvoiceRequestDTO;
import com.order_pay_service.dto.InvoiceDetailDTO;
import com.order_pay_service.models.Invoice;
import com.order_pay_service.models.InvoiceDetail;
import com.order_pay_service.modelsAcopl.Customer;
import com.order_pay_service.modelsAcopl.Product;
import com.order_pay_service.repository.CustomerRepository;
import com.order_pay_service.repository.InvoiceRepository;
import com.order_pay_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Invoice createInvoice(InvoiceRequestDTO dto) {
        // Buscar al cliente
        System.out.println(dto.getCustomerCode());
        Customer customer = customerRepository.findByUserCode(dto.getCustomerCode());
        System.out.println(dto.getCustomerCode());

        // Generar un número de serie único
        String seriesNumber;
        do {
            seriesNumber = generateSeriesNumber();
        } while (invoiceRepository.existsBySeriesNumber(seriesNumber));

        // Validar existencia y stock de productos
        for (InvoiceDetailDTO detailDTO : dto.getDetails()) {
            Product product = productRepository.findByCode(detailDTO.getProductCode());
            if (product == null) {
                throw new RuntimeException("Product not found: " + detailDTO.getProductCode());
            }
            if (product.getStock() < detailDTO.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product code: " + product.getCode());
            }
        }

        // Crear los detalles, reducir stock y calcular subtotales
        List<InvoiceDetail> details = dto.getDetails().stream().map(detailDTO -> {
            Product product = productRepository.findByCode(detailDTO.getProductCode());

            int quantity = detailDTO.getQuantity();
            double unitPrice = product.getPrice();
            double subtotal = quantity * unitPrice;

            // Reducir stock
            product.setStock(product.getStock() - quantity);
            productRepository.save(product);

            return InvoiceDetail.builder()
                    .quantity(quantity)
                    .unitPrice(unitPrice)
                    .subtotal(subtotal)
                    .product(product)
                    .build();
        }).collect(Collectors.toList());

        // Calcular el total de la boleta
        double totalAmount = details.stream()
                .mapToDouble(InvoiceDetail::getSubtotal)
                .sum();

        // Crear cabecera de la boleta
        Invoice invoice = Invoice.builder()
                .seriesNumber(seriesNumber)
                .issuedAt(LocalDateTime.now())
                .estate(dto.getEstate())
                .shippingAddress(dto.getShippingAddress())
                .totalAmount(totalAmount)
                .customer(customer)
                .details(details)
                .build();

        // Asociar la boleta a cada detalle
        details.forEach(detail -> detail.setInvoice(invoice));

        return invoiceRepository.save(invoice);
    }

    private String generateSeriesNumber() {
        return "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public List<Invoice> getInvoicesByUserCode(String userCode) {
        return invoiceRepository.findByCustomerUserCode(userCode);
    }

}
