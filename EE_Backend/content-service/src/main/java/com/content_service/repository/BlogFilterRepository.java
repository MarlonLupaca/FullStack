package com.content_service.repository;

import com.content_service.entity.BlogFilter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogFilterRepository extends JpaRepository<BlogFilter, Long> {

    // Buscar filtros activos
    List<BlogFilter> findByActiveTrue();

    // Buscar por tipo de filtro
    List<BlogFilter> findByFilterTypeAndActiveTrue(String filterType);

    // Buscar por nombre de filtro
    Optional<BlogFilter> findByFilterName(String filterName);

    // Verificar si existe un filtro con ese nombre
    boolean existsByFilterName(String filterName);
}