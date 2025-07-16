package com.product_service.repository.review;

import com.product_service.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserCode(String userCode);
    List<Review> findByProductCode(String productCode);
}
