package com.product_service.Controller.category;

import com.product_service.dto.category.request.CategoryRequestDTO;
import com.product_service.dto.category.response.CategoryResponseDTO;
import com.product_service.service.category.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestBody CategoryRequestDTO request) {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@PathVariable String categoryId) {
        return ResponseEntity.ok(categoryService.getCategoryById(categoryId));
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable String categoryId, @RequestBody CategoryRequestDTO request) {
        return ResponseEntity.ok(categoryService.updateCategory(categoryId, request));
    }

    @PatchMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }
}
