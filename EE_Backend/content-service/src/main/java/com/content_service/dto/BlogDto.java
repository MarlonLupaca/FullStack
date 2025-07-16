package com.content_service.dto;

import java.time.LocalDateTime;

public class BlogDto {

    private Long id;
    private String title;
    private String content;
    private String summary;
    private String author;
    private String category;
    private String imageUrl;
    private Boolean published;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public BlogDto() {}

    public BlogDto(Long id, String title, String content, String summary,
                   String author, String category, String imageUrl,
                   Boolean published, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.summary = summary;
        this.author = author;
        this.category = category;
        this.imageUrl = imageUrl;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

