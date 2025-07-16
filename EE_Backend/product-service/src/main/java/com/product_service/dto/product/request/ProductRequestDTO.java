package com.product_service.dto.product.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {
    private String name;
    private String description;
    private String longDescription;
    private String categoryId;
    private String category;
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
    private List<String> tags;
    private List<String> highlights;
    private MultipartFile image; // Imagen subida por el cliente
}
