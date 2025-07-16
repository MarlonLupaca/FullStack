package com.report_service.entities.data;

public class User {
    public String id;
    public String name;
    public String email;
    public String telephone;
    public String dateRegistered;
    public int purchases;
    public double totalSpent;
    public String status;


    public User() {
    }

    public User(String id, String name, String email, String telephone, String dateRegistered, int purchases, double totalSpent, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telephone = telephone;
        this.dateRegistered = dateRegistered;
        this.purchases = purchases;
        this.totalSpent = totalSpent;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getDateRegistered() {
        return dateRegistered;
    }

    public void setDateRegistered(String dateRegistered) {
        this.dateRegistered = dateRegistered;
    }

    public int getPurchases() {
        return purchases;
    }

    public void setPurchases(int purchases) {
        this.purchases = purchases;
    }

    public double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
