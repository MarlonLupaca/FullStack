package com.product_service.dto.review.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDTO {
    private Long id;
    private String productCode;
    private String userCode;
    private int rating;
    private String comment;
}
