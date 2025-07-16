package com.content_service.service;

import com.content_service.dto.BlogFilterDto;
import com.content_service.entity.BlogFilter;
import com.content_service.repository.BlogFilterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogFilterService {

    @Autowired
    private BlogFilterRepository blogFilterRepository;

    // Obtener todos los filtros activos
    public List<BlogFilterDto> getActiveFilters() {
        return blogFilterRepository.findByActiveTrue()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Obtener filtros por tipo
    public List<BlogFilterDto> getFiltersByType(String filterType) {
        return blogFilterRepository.findByFilterTypeAndActiveTrue(filterType)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Obtener todos los filtros (para admin)
    public List<BlogFilterDto> getAllFilters() {
        return blogFilterRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Obtener filtro por ID
    public Optional<BlogFilterDto> getFilterById(Long id) {
        return blogFilterRepository.findById(id).map(this::convertToDto);
    }

    // Crear nuevo filtro
    public BlogFilterDto createFilter(String filterName, String filterType, String description) {
        if (blogFilterRepository.existsByFilterName(filterName)) {
            throw new RuntimeException("Filter with name '" + filterName + "' already exists");
        }

        BlogFilter filter = new BlogFilter(filterName, filterType, description);
        BlogFilter savedFilter = blogFilterRepository.save(filter);
        return convertToDto(savedFilter);
    }

    // Actualizar filtro
    public Optional<BlogFilterDto> updateFilter(Long id, String filterName, String filterType,
                                                String description, Boolean active) {
        return blogFilterRepository.findById(id).map(filter -> {
            // Verificar si el nuevo nombre ya existe (solo si es diferente del actual)
            if (!filter.getFilterName().equals(filterName) &&
                    blogFilterRepository.existsByFilterName(filterName)) {
                throw new RuntimeException("Filter with name '" + filterName + "' already exists");
            }

            filter.setFilterName(filterName);
            filter.setFilterType(filterType);
            filter.setDescription(description);
            filter.setActive(active);

            BlogFilter savedFilter = blogFilterRepository.save(filter);
            return convertToDto(savedFilter);
        });
    }

    // Activar/Desactivar filtro
    public Optional<BlogFilterDto> toggleFilterStatus(Long id) {
        return blogFilterRepository.findById(id).map(filter -> {
            filter.setActive(!filter.getActive());
            BlogFilter savedFilter = blogFilterRepository.save(filter);
            return convertToDto(savedFilter);
        });
    }

    // Eliminar filtro
    public boolean deleteFilter(Long id) {
        if (blogFilterRepository.existsById(id)) {
            blogFilterRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Inicializar filtros por defecto
    public void initializeDefaultFilters() {
        if (blogFilterRepository.count() == 0) {
            // Crear filtros por defecto
            createFilter("Tecnología", "CATEGORY", "Artículos sobre tecnología e innovación");
            createFilter("Ecommerce", "CATEGORY", "Artículos sobre comercio electrónico");
            createFilter("Marketing", "CATEGORY", "Artículos sobre marketing digital");
            createFilter("Noticias", "CATEGORY", "Noticias y actualidades");

            createFilter("Publicado", "STATUS", "Filtrar por estado de publicación");
            createFilter("Borrador", "STATUS", "Filtrar borradores");

            createFilter("Fecha", "DATE", "Filtrar por fecha de publicación");
            createFilter("Autor", "AUTHOR", "Filtrar por autor del artículo");
        }
    }

    // Convertir Entity a DTO
    private BlogFilterDto convertToDto(BlogFilter filter) {
        return new BlogFilterDto(
                filter.getId(),
                filter.getFilterName(),
                filter.getFilterType(),
                filter.getDescription(),
                filter.getActive(),
                filter.getCreatedAt(),
                filter.getUpdatedAt()
        );
    }
}