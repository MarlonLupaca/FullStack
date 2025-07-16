package com.content_service.dto;

import java.time.LocalDateTime;

// DTO para filtros
public class BlogFilterDto {
    private Long id;
    private String filterName;
    private String filterType;
    private String description;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public BlogFilterDto() {}

    public BlogFilterDto(Long id, String filterName, String filterType,
                         String description, Boolean active,
                         LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.filterName = filterName;
        this.filterType = filterType;
        this.description = description;
        this.active = active;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
