package com.content_service.repository;

import com.content_service.entity.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    // Buscar blogs publicados
    Page<Blog> findByPublishedTrue(Pageable pageable);

    // Buscar por categoría
    Page<Blog> findByCategoryAndPublishedTrue(String category, Pageable pageable);

    // Buscar por autor
    Page<Blog> findByAuthorAndPublishedTrue(String author, Pageable pageable);

    // Buscar por título o contenido
    @Query("SELECT b FROM Blog b WHERE b.published = true AND " +
            "(LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Blog> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // Buscar por rango de fechas
    @Query("SELECT b FROM Blog b WHERE b.published = true AND " +
            "b.createdAt BETWEEN :startDate AND :endDate")
    Page<Blog> findByDateRange(@Param("startDate") LocalDateTime startDate,
                               @Param("endDate") LocalDateTime endDate,
                               Pageable pageable);

    // Obtener todas las categorías únicas
    @Query("SELECT DISTINCT b.category FROM Blog b WHERE b.published = true AND b.category IS NOT NULL")
    List<String> findDistinctCategories();

    // Obtener todos los autores únicos
    @Query("SELECT DISTINCT b.author FROM Blog b WHERE b.published = true AND b.author IS NOT NULL")
    List<String> findDistinctAuthors();

    // Búsqueda avanzada con múltiples filtros
    @Query("SELECT b FROM Blog b WHERE " +
            "(:category IS NULL OR b.category = :category) AND " +
            "(:author IS NULL OR b.author = :author) AND " +
            "(:published IS NULL OR b.published = :published) AND " +
            "(:keyword IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(b.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Blog> findWithFilters(@Param("category") String category,
                               @Param("author") String author,
                               @Param("published") Boolean published,
                               @Param("keyword") String keyword,
                               Pageable pageable);
}