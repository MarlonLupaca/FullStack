package com.product_service.service.review;

import com.product_service.dto.review.request.ReviewRequestDTO;
import com.product_service.dto.review.response.ReviewResponseDTO;
import com.product_service.models.Review;
import com.product_service.repository.review.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private ReviewResponseDTO mapToDTO(Review review) {
        return ReviewResponseDTO.builder()
                .id(review.getId())
                .productCode(review.getProductCode())
                .userCode(review.getUserCode())
                .rating(review.getRating())
                .comment(review.getComment())
                .build();
    }

    private Review mapToEntity(ReviewRequestDTO dto) {
        return Review.builder()
                .productCode(dto.getProductCode())
                .userCode(dto.getUserCode())
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();
    }

    @Override
    public ReviewResponseDTO createReview(ReviewRequestDTO dto) {
        Review saved = reviewRepository.save(mapToEntity(dto));
        return mapToDTO(saved);
    }

    @Override
    public ReviewResponseDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reseña no encontrada"));
        return mapToDTO(review);
    }

    @Override
    public List<ReviewResponseDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDTO updateReview(Long id, ReviewRequestDTO dto) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reseña no encontrada"));

        review.setProductCode(dto.getProductCode());
        review.setUserCode(dto.getUserCode());
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());

        Review updated = reviewRepository.save(review);
        return mapToDTO(updated);
    }

    @Override
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Reseña no encontrada"));
        reviewRepository.delete(review);
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByUserCode(String userCode) {
        return reviewRepository.findByUserCode(userCode)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponseDTO> getReviewsByProductCode(String productCode) {
        return reviewRepository.findByProductCode(productCode)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }
}
