package com.product_service.utils;

import com.product_service.dto.product.response.ProductResponseDTO;
import com.product_service.models.Product;

public class ProductMapper {

    public static ProductResponseDTO toDto(Product product) {
        return ProductResponseDTO.builder()
                .code(product.getCode())
                .name(product.getName())
                .description(product.getDescription())
                .longDescription(product.getLongDescription())
                .categoryId(product.getCategory().getCategoryId())
                .category(product.getCategory().getName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .rating(product.getRating())
                .reviewCount(product.getReviewCount())
                .stock(product.getStock())
                .isNew(product.getIsNew())
                .isActive(product.getIsActive())
                .materialInfo(product.getMaterialInfo())
                .dimensions(product.getDimensions())
                .weight(product.getWeight())
                .capacity(product.getCapacity())
                .care(product.getCare())
                .warranty(product.getWarranty())
                .origin(product.getOrigin())
                .imageUrl("/images/" + product.getImageName())
                .tags(product.getTags())
                .highlights(product.getHighlights())
                .build();
    }
}
