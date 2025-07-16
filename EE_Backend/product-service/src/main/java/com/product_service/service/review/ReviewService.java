package com.product_service.service.review;

import com.product_service.dto.review.request.ReviewRequestDTO;
import com.product_service.dto.review.response.ReviewResponseDTO;

import java.util.List;

public interface ReviewService {
    ReviewResponseDTO createReview(ReviewRequestDTO dto);
    ReviewResponseDTO getReviewById(Long id);
    List<ReviewResponseDTO> getAllReviews();
    ReviewResponseDTO updateReview(Long id, ReviewRequestDTO dto);
    void deleteReview(Long id);

    List<ReviewResponseDTO> getReviewsByUserCode(String userCode);
    List<ReviewResponseDTO> getReviewsByProductCode(String productCode);
}
