package com.product_service.service.product;

import com.product_service.dto.product.request.ProductRequestDTO;
import com.product_service.dto.product.response.ProductResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    // Crear un nuevo producto
    ProductResponseDTO createProduct(ProductRequestDTO request, MultipartFile imageFile);


    // Actualizar un producto (excepto el código)
    ProductResponseDTO updateProduct(Integer code, ProductRequestDTO request, MultipartFile imageFile);

    // Obtener un producto por su código
    ProductResponseDTO getProductByCode(Integer code);

    // Listar todos los productos
    List<ProductResponseDTO> getAllProducts();

    // Activar un producto
    void activateProduct(Integer code);

    // Desactivar un producto
    void deactivateProduct(Integer code);
}
