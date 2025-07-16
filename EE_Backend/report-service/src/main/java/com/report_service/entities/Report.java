package com.report_service.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportName;
    private String reportType;
    private String reportData;

    public Report() {
    }

    public Report(String reportName, String reportType, String reportData) {
        this.reportName = reportName;
        this.reportType = reportType;
        this.reportData = reportData;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReportName() {
        return reportName;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public String getReportType() {
        return reportType;
    }

    public void setReportType(String reportType) {
        this.reportType = reportType;
    }

    public String getReportData() {
        return reportData;
    }

    public void setReportData(String reportData) {
        this.reportData = reportData;
    }
}
