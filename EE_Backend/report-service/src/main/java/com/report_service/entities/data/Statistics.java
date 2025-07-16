package com.report_service.entities.data;

public class Statistics {
    public String title;
    public String value;
    public String change;
    public String icon;
    public boolean positive;


    public Statistics() {
    }

    public Statistics(String title, String value, String change, String icon, boolean positive) {
        this.title = title;
        this.value = value;
        this.change = change;
        this.icon = icon;
        this.positive = positive;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public boolean isPositive() {
        return positive;
    }

    public void setPositive(boolean positive) {
        this.positive = positive;
    }
}
