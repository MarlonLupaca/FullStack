package com.report_service.entities.data;

public class BestSellingProduct {
    public String name;
    public double value;
    public double revenue;

    public BestSellingProduct() {
    }

    public BestSellingProduct(String name, double revenue, double value) {
        this.name = name;
        this.revenue = revenue;
        this.value = value;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
