package com.content_service.dto;

// DTO para crear/actualizar
public class BlogCreateDto {
    private String title;
    private String content;
    private String summary;
    private String author;
    private String category;
    private String imageUrl;
    private Boolean published = false;


    public BlogCreateDto() {}


    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getPublished() { return published; }
    public void setPublished(Boolean published) { this.published = published; }
}
