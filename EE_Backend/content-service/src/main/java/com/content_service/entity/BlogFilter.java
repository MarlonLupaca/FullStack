package com.content_service.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_filters")
public class BlogFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String filterName;

    @Column(nullable = false, length = 50)
    private String filterType;

    @Column(length = 200)
    private String description;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }


    public BlogFilter() {}

    public BlogFilter(String filterName, String filterType, String description) {
        this.filterName = filterName;
        this.filterType = filterType;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFilterName() { return filterName; }
    public void setFilterName(String filterName) { this.filterName = filterName; }

    public String getFilterType() { return filterType; }
    public void setFilterType(String filterType) { this.filterType = filterType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}