package com.product_service.Controller.review;

import com.product_service.dto.review.request.ReviewRequestDTO;
import com.product_service.dto.review.response.ReviewResponseDTO;
import com.product_service.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> create(@RequestBody ReviewRequestDTO dto) {
        return ResponseEntity.ok(reviewService.createReview(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAll() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> update(@PathVariable Long id, @RequestBody ReviewRequestDTO dto) {
        return ResponseEntity.ok(reviewService.updateReview(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userCode}")
    public ResponseEntity<List<ReviewResponseDTO>> getByUser(@PathVariable String userCode) {
        return ResponseEntity.ok(reviewService.getReviewsByUserCode(userCode));
    }

    @GetMapping("/product/{productCode}")
    public ResponseEntity<List<ReviewResponseDTO>> getByProduct(@PathVariable String productCode) {
        return ResponseEntity.ok(reviewService.getReviewsByProductCode(productCode));
    }
}

