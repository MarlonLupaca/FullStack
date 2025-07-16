package com.report_service.entities.data;

import java.util.ArrayList;

public class Product {

    public int id;
    public String image;
    public String name;
    public String description;
    public String longDescription;
    public String category;
    public double price;
    public String discount;
    public double rating;
    public int reviewCount;
    public int stock;
    public boolean isNew;
    public String materialInfo;
    public String dimensions;
    public String weight;
    public String capacity;
    public String care;
    public String warranty;
    public String origin;
    public ArrayList<String> tags;
    public ArrayList<String> highlights;
    public ArrayList<Review> reviews;
    public ArrayList<Integer> relatedProducts;

    public Product() {
    }

    public Product(int id, String image, String name, String description, String longDescription, String category, double price, String discount, double rating, int reviewCount, int stock, boolean isNew, String materialInfo, String dimensions, String weight, String capacity, String care, String warranty, String origin, ArrayList<String> tags, ArrayList<String> highlights, ArrayList<Review> reviews, ArrayList<Integer> relatedProducts) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.longDescription = longDescription;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.stock = stock;
        this.isNew = isNew;
        this.materialInfo = materialInfo;
        this.dimensions = dimensions;
        this.weight = weight;
        this.capacity = capacity;
        this.care = care;
        this.warranty = warranty;
        this.origin = origin;
        this.tags = tags;
        this.highlights = highlights;
        this.reviews = reviews;
        this.relatedProducts = relatedProducts;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDiscount() {
        return discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(int reviewCount) {
        this.reviewCount = reviewCount;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public boolean isNew() {
        return isNew;
    }

    public void setNew(boolean aNew) {
        isNew = aNew;
    }

    public String getMaterialInfo() {
        return materialInfo;
    }

    public void setMaterialInfo(String materialInfo) {
        this.materialInfo = materialInfo;
    }

    public String getDimensions() {
        return dimensions;
    }

    public void setDimensions(String dimensions) {
        this.dimensions = dimensions;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getCare() {
        return care;
    }

    public void setCare(String care) {
        this.care = care;
    }

    public String getWarranty() {
        return warranty;
    }

    public void setWarranty(String warranty) {
        this.warranty = warranty;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public ArrayList<String> getHighlights() {
        return highlights;
    }

    public void setHighlights(ArrayList<String> highlights) {
        this.highlights = highlights;
    }

    public ArrayList<Review> getReviews() {
        return reviews;
    }

    public void setReviews(ArrayList<Review> reviews) {
        this.reviews = reviews;
    }

    public ArrayList<Integer> getRelatedProducts() {
        return relatedProducts;
    }

    public void setRelatedProducts(ArrayList<Integer> relatedProducts) {
        this.relatedProducts = relatedProducts;
    }
}
