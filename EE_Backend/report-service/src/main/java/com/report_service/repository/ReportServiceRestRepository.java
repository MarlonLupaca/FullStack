package com.report_service.repository;

import com.report_service.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportServiceRestRepository extends JpaRepository<Report, Long> {
}
