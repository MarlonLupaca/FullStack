package com.product_service.dto.category.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponseDTO {
    private String categoryId;
    private String name;
    private String description;
    private boolean active;
}
