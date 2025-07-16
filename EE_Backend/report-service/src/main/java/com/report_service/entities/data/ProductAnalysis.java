package com.report_service.entities.data;

public class ProductAnalysis {

    private String name;
    private double totalSales;
    private int stock;
    private double marginPercent;
    private String status;

    public ProductAnalysis() {
    }

    public ProductAnalysis(String name, double totalSales, int stock, double marginPercent, String status) {
        this.name = name;
        this.totalSales = totalSales;
        this.stock = stock;
        this.marginPercent = marginPercent;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(double totalSales) {
        this.totalSales = totalSales;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public double getMarginPercent() {
        return marginPercent;
    }

    public void setMarginPercent(double marginPercent) {
        this.marginPercent = marginPercent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
