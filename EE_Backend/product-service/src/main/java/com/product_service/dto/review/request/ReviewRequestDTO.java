package com.product_service.dto.review.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequestDTO {
    private String productCode;
    private String userCode;
    private int rating;
    private String comment;
}
