package com.product_service.utils;

import com.product_service.repository.product.ProductRepository;
import com.product_service.repository.category.CategoryRepository;

import java.util.Random;

public class CodeGenerator {

    public static int generateUniqueCode(ProductRepository productRepository) {
        Random random = new Random();
        int code;
        do {
            code = 10000 + random.nextInt(90000); // 5 dígitos
        } while (productRepository.existsByCode(code));
        return code;
    }

    public static String generateUniqueCategoryCode(CategoryRepository categoryRepository) {
        Random random = new Random();
        int code;
        do {
            code = 100 + random.nextInt(900); // 3 dígitos (100–999)
        } while (categoryRepository.existsByCategoryId(String.valueOf(code)));
        return String.valueOf(code);
    }
}
