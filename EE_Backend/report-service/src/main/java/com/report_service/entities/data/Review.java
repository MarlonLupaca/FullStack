package com.report_service.entities.data;

public class Review {
    public String user;
    public int rating;
    public String date;
    public String comment;
    public int helpful;


    public Review() {
    }

    public Review(String user, int rating, String date, String comment, int helpful) {
        this.user = user;
        this.rating = rating;
        this.date = date;
        this.comment = comment;
        this.helpful = helpful;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getHelpful() {
        return helpful;
    }

    public void setHelpful(int helpful) {
        this.helpful = helpful;
    }
}
