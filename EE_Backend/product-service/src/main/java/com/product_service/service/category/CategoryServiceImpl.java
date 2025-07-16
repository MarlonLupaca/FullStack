package com.product_service.service.category;

import com.product_service.dto.category.request.CategoryRequestDTO;
import com.product_service.dto.category.response.CategoryResponseDTO;
import com.product_service.models.Category;
import com.product_service.repository.category.CategoryRepository;
import com.product_service.utils.CodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {

        CodeGenerator codeGenerator = new CodeGenerator();

        Category category = Category.builder()
                .categoryId(codeGenerator.generateUniqueCategoryCode(categoryRepository))
                .name(request.getName())
                .description(request.getDescription())
                .active(true)
                .build();
        return mapToDTO(categoryRepository.save(category));
    }

    @Override
    public CategoryResponseDTO getCategoryById(String categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new NoSuchElementException("Categoría no encontrada"));
        return mapToDTO(category);
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponseDTO updateCategory(String categoryId, CategoryRequestDTO request) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new NoSuchElementException("Categoría no encontrada"));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        return mapToDTO(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(String categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new NoSuchElementException("Categoría no encontrada"));

        category.setActive(!category.isActive()); // Intercambia el estado
        categoryRepository.save(category);
    }

    private CategoryResponseDTO mapToDTO(Category category) {
        return CategoryResponseDTO.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .description(category.getDescription())
                .active(category.isActive())
                .build();
    }
}
