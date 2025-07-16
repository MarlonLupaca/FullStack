package com.product_service.dto.product.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {
    private Integer code;
    private String name;
    private String description;
    private String longDescription;
    private String category;
    private String categoryId;
    private Double price;
    private String discount;
    private Double rating;
    private Integer reviewCount;
    private Integer stock;
    private Boolean isNew;
    private Boolean isActive;
    private String materialInfo;
    private String dimensions;
    private String weight;
    private String capacity;
    private String care;
    private String warranty;
    private String origin;
    private String imageUrl;
    private List<String> tags;
    private List<String> highlights;
}
