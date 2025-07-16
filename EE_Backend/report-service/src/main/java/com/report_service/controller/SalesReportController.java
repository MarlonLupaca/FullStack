package com.report_service.controller;

import com.report_service.dto.SalesSummaryDTO;
import com.report_service.dto.TopProductDTO;
import com.report_service.service.SalesReportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports/sales")
public class SalesReportController {

    private final SalesReportService salesReportService;

    public SalesReportController(SalesReportService salesReportService) {
        this.salesReportService = salesReportService;
    }

    @GetMapping("/summary")
    public ResponseEntity<SalesSummaryDTO> getSalesSummary(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(salesReportService.getSalesSummary(startDate, endDate));
    }

    @GetMapping("/top-products")
    public ResponseEntity<List<TopProductDTO>> getTopSellingProducts() {
        return ResponseEntity.ok(salesReportService.getTopSellingProducts());
    }

    @GetMapping("/trends")
    public ResponseEntity<List<?>> getSalesTrend() {
        return ResponseEntity.ok(salesReportService.getSalesTrend());
    }

    @GetMapping("/by-region")
    public ResponseEntity<List<?>> getSalesByRegion() {
        return ResponseEntity.ok(salesReportService.getSalesByRegion());
    }
}
