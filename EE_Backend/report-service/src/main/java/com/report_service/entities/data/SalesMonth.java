package com.report_service.entities.data;

public class SalesMonth {

    public String name;
    public int sales;
    public int products;
    public int costs;

    public SalesMonth() {
    }

    public SalesMonth(int costs, String name, int sales, int products) {
        this.costs = costs;
        this.name = name;
        this.sales = sales;
        this.products = products;
    }

    public int getCosts() {
        return costs;
    }

    public void setCosts(int costs) {
        this.costs = costs;
    }

    public int getProducts() {
        return products;
    }

    public void setProducts(int products) {
        this.products = products;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSales() {
        return sales;
    }

    public void setSales(int sales) {
        this.sales = sales;
    }
}
