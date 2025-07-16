package com.report_service.controller;

import com.report_service.dto.UserGrowthDTO;
import com.report_service.service.UserReportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports/users")

public class UserReportController {
    private final UserReportService userReportService;

    public UserReportController(UserReportService userReportService) {
        this.userReportService = userReportService;
    }

    @GetMapping("/new-users")
    public ResponseEntity<List<UserGrowthDTO>> getNewUsers(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(userReportService.getNewUsers(startDate, endDate));
    }

    @GetMapping("/top-customers")
    public ResponseEntity<List<?>> getTopCustomers() {
        return ResponseEntity.ok(userReportService.getTopCustomers());
    }

    @GetMapping("/active-users")
    public ResponseEntity<Long> countActiveUsers() {
        return ResponseEntity.ok(userReportService.countActiveUsers());
    }
}
