package com.report_service.entities.data;

public class FinancialProjection {

    public String period;
    public double estimatedRevenue;
    public double estimatedExpenses;
    public double estimatedProfit;
    public double growthPercentage;

    public FinancialProjection() {
    }

    public FinancialProjection(String period, double estimatedRevenue, double estimatedExpenses, double estimatedProfit, double growthPercentage) {
        this.period = period;
        this.estimatedRevenue = estimatedRevenue;
        this.estimatedExpenses = estimatedExpenses;
        this.estimatedProfit = estimatedProfit;
        this.growthPercentage = growthPercentage;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public double getEstimatedRevenue() {
        return estimatedRevenue;
    }

    public void setEstimatedRevenue(double estimatedRevenue) {
        this.estimatedRevenue = estimatedRevenue;
    }

    public double getEstimatedExpenses() {
        return estimatedExpenses;
    }

    public void setEstimatedExpenses(double estimatedExpenses) {
        this.estimatedExpenses = estimatedExpenses;
    }

    public double getEstimatedProfit() {
        return estimatedProfit;
    }

    public void setEstimatedProfit(double estimatedProfit) {
        this.estimatedProfit = estimatedProfit;
    }

    public double getGrowthPercentage() {
        return growthPercentage;
    }

    public void setGrowthPercentage(double growthPercentage) {
        this.growthPercentage = growthPercentage;
    }
}
