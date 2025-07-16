package com.product_service.service.product;

import com.product_service.dto.product.request.ProductRequestDTO;
import com.product_service.dto.product.response.ProductResponseDTO;
import com.product_service.models.Category;
import com.product_service.models.Product;
import com.product_service.repository.category.CategoryRepository;
import com.product_service.repository.product.ProductRepository;
import com.product_service.utils.CodeGenerator;
import com.product_service.utils.ImageUtil;
import com.product_service.utils.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private final ProductRepository productRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO request, MultipartFile imageFile) {
        String imageName = ImageUtil.saveImage(imageFile);

        Category category = categoryRepository.findByCategoryId(request.getCategory())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Product product = Product.builder()
                .code(CodeGenerator.generateUniqueCode(productRepository))
                .name(request.getName())
                .description(request.getDescription())
                .longDescription(request.getLongDescription())
                .category(category)
                .price(request.getPrice())
                .discount(request.getDiscount())
                .rating(request.getRating())
                .reviewCount(request.getReviewCount())
                .stock(request.getStock())
                .isNew(request.getIsNew())
                .isActive(true)
                .materialInfo(request.getMaterialInfo())
                .dimensions(request.getDimensions())
                .weight(request.getWeight())
                .capacity(request.getCapacity())
                .care(request.getCare())
                .warranty(request.getWarranty())
                .origin(request.getOrigin())
                .imageName(imageName)
                .tags(request.getTags())
                .highlights(request.getHighlights())
                .build();

        productRepository.save(product);
        return ProductMapper.toDto(product);
    }

    @Override
    public ProductResponseDTO updateProduct(Integer code, ProductRequestDTO request, MultipartFile imageFile) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageName = ImageUtil.saveImage(imageFile);
            product.setImageName(imageName);
        }

        Category category = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setLongDescription(request.getLongDescription());
        product.setCategory(category);
        product.setPrice(request.getPrice());
        product.setDiscount(request.getDiscount());
        product.setRating(request.getRating());
        product.setReviewCount(request.getReviewCount());
        product.setStock(request.getStock());
        product.setIsNew(request.getIsNew());
        product.setMaterialInfo(request.getMaterialInfo());
        product.setDimensions(request.getDimensions());
        product.setWeight(request.getWeight());
        product.setCapacity(request.getCapacity());
        product.setCare(request.getCare());
        product.setWarranty(request.getWarranty());
        product.setOrigin(request.getOrigin());
        product.setTags(request.getTags());
        product.setHighlights(request.getHighlights());

        return ProductMapper.toDto(productRepository.save(product));
    }

    @Override
    public ProductResponseDTO getProductByCode(Integer code) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return ProductMapper.toDto(product);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void activateProduct(Integer code) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        product.setIsActive(true);
        productRepository.save(product);
    }

    @Override
    public void deactivateProduct(Integer code) {
        Product product = productRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        product.setIsActive(false);
        productRepository.save(product);
    }
}
