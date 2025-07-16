package com.report_service.controller;

import com.report_service.dto.TopProductDTO;
import com.report_service.service.ProductReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports/products")
public class ProductReportController {

    private final ProductReportService productReportService;

    public ProductReportController(ProductReportService productReportService) {
        this.productReportService = productReportService;
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<?>> getLowStockProducts() {
        return ResponseEntity.ok(productReportService.getLowStockProducts());
    }

    @GetMapping("/top-sellers")
    public ResponseEntity<List<TopProductDTO>> getTopSellingProducts() {
        return ResponseEntity.ok(productReportService.getTopSellingProducts());
    }

    @GetMapping("/inventory-movements")
    public ResponseEntity<List<?>> getInventoryMovements() {
        return ResponseEntity.ok(productReportService.getInventoryMovements());
    }

    @GetMapping("/categories-popularity")
    public ResponseEntity<List<?>> getPopularCategories() {
        return ResponseEntity.ok(productReportService.getPopularCategories());
    }
}
