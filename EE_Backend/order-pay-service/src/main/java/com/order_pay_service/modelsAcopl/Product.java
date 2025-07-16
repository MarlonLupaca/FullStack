package com.order_pay_service.modelsAcopl;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID autogenerado

    @Column(unique = true, nullable = false)
    private Integer code; // Código del producto (de negocio, aleatorio de 5 dígitos)

    private String name; // Nombre del producto

    private String description; // Descripción corta

    @Column(length = 1000)
    private String longDescription; // Descripción larga

    @ManyToOne
    @JoinColumn(name = "category_code", referencedColumnName = "categoryId")
    private Category category; // Categoría del producto

    private Double price; // Precio

    private String discount; // Descuento (ej. "20%")

    private Double rating; // Valoración promedio

    private Integer reviewCount; // Número de reseñas

    private Integer stock; // Stock disponible

    private Boolean isNew; // ¿Es un producto nuevo?

    private Boolean isActive; // ¿Es un producto nuevo?

    private String materialInfo; // Información de materiales

    private String dimensions; // Dimensiones (ej. "22cm x 7cm")

    private String weight; // Peso (ej. "320g")

    private String capacity; // Capacidad (ej. "500ml")

    private String care; // Instrucciones de cuidado

    private String warranty; // Garantía

    private String origin; // Origen del producto

    private String imageName; // Nombre de la imagen almacenada en el servidor

    @ElementCollection
    private List<String> tags; // Etiquetas del producto

    @ElementCollection
    private List<String> highlights; // Puntos destacados del producto
}