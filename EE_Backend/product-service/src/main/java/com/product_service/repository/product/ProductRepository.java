package com.product_service.repository.product;

import com.product_service.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Buscar por el código del producto de negocio
    Optional<Product> findByCode(Integer code);

    // Verificar existencia por código
    boolean existsByCode(Integer code);
}
