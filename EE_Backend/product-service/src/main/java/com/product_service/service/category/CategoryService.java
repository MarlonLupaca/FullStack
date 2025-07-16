package com.product_service.service.category;

import com.product_service.dto.category.request.CategoryRequestDTO;
import com.product_service.dto.category.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRequestDTO request);
    CategoryResponseDTO getCategoryById(String categoryId);
    List<CategoryResponseDTO> getAllCategories();
    CategoryResponseDTO updateCategory(String categoryId, CategoryRequestDTO request);
    void deleteCategory(String categoryId);
}

