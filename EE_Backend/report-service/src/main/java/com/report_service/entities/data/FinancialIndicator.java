package com.report_service.entities.data;

public class FinancialIndicator {

    public String indicatorName;
    public double currentValue;
    public double changePercentage;

    public FinancialIndicator() {
    }

    public FinancialIndicator(String indicatorName, double currentValue, double changePercentage) {
        this.indicatorName = indicatorName;
        this.currentValue = currentValue;
        this.changePercentage = changePercentage;
    }

    public String getIndicatorName() {
        return indicatorName;
    }

    public void setIndicatorName(String indicatorName) {
        this.indicatorName = indicatorName;
    }

    public double getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(double currentValue) {
        this.currentValue = currentValue;
    }

    public double getChangePercentage() {
        return changePercentage;
    }

    public void setChangePercentage(double changePercentage) {
        this.changePercentage = changePercentage;
    }
}
