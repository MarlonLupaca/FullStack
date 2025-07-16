package com.product_service.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {

    @Id
    private String categoryId;

    @Column(nullable = false, unique = true)
    private String name; // Nombre de la categoría (por ejemplo, "Cocina", "Tecnología", etc.)

    @Column(length = 500)
    private String description; // Descripción opcional de la categoría

    private boolean active;
}
