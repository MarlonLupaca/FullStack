package com.report_service.service;

import com.report_service.dto.UserGrowthDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserReportService {

    public List<UserGrowthDTO> getNewUsers(LocalDate startDate, LocalDate endDate) {
        return null;
    }

    public List<?> getTopCustomers() {
        return null;
    }

    public Long countActiveUsers() {
        return null;
    }
}
