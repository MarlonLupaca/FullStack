package com.product_service.Controller.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product_service.dto.product.request.ProductRequestDTO;
import com.product_service.dto.product.response.ProductResponseDTO;
import com.product_service.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    private final ObjectMapper objectMapper;

    public ProductController(ProductService productService, ObjectMapper objectMapper) {
        this.productService = productService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestPart("product") String productJson,
            @RequestPart("image") MultipartFile imageFile
    ) throws JsonProcessingException {
        ProductRequestDTO productDTO = objectMapper.readValue(productJson, ProductRequestDTO.class);
        return ResponseEntity.ok(productService.createProduct(productDTO, imageFile));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{code}")
    public ResponseEntity<ProductResponseDTO> getProductByCode(@PathVariable Integer code) {
        return ResponseEntity.ok(productService.getProductByCode(code));
    }

    @PutMapping("/{code}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Integer code,
            @RequestPart("product") String productJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws JsonProcessingException {
        ProductRequestDTO updatedDTO = objectMapper.readValue(productJson, ProductRequestDTO.class);
        return ResponseEntity.ok(productService.updateProduct(code, updatedDTO, imageFile));
    }



    @PatchMapping("/{code}/activate")
    public ResponseEntity<Void> activateProduct(@PathVariable Integer code) {
        productService.activateProduct(code);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{code}/deactivate")
    public ResponseEntity<Void> deactivateProduct(@PathVariable Integer code) {
        productService.deactivateProduct(code);
        return ResponseEntity.noContent().build();
    }
}
