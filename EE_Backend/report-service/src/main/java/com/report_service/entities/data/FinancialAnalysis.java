package com.report_service.entities.data;

public class FinancialAnalysis {

    public String name;
    public double value;

    public FinancialAnalysis() {
    }

    public FinancialAnalysis(String name, double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
