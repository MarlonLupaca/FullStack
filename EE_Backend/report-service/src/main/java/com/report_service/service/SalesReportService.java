package com.report_service.service;

import com.report_service.dto.SalesSummaryDTO;
import com.report_service.dto.TopProductDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class SalesReportService {

    public SalesSummaryDTO getSalesSummary(LocalDate startDate, LocalDate endDate) {
        return null;
    }
    public List<TopProductDTO> getTopSellingProducts() {
        return null;
    }
    public List<?> getSalesTrend() {
        return null;
    }
    public List<?> getSalesByRegion() {
        return null;
    }
    public List<?> getSalesByCategory() {
        return null;
    }
}
