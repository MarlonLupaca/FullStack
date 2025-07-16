package com.product_service.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID único de la reseña

    @Column(nullable = false)
    private String productCode; // Código del producto al que pertenece la reseña

    @Column(nullable = false)
    private String userCode; // Código del usuario que hizo la reseña

    @Column(nullable = false)
    private int rating; // Valoración numérica (por ejemplo, del 1 al 5)

    @Column(nullable = false, length = 1000)
    private String comment; // Comentario del usuario
}
