package com.content_service.controller;

import com.content_service.dto.BlogFilterDto;
import com.content_service.service.BlogFilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/blog-filters")
@CrossOrigin(origins = "*")
public class BlogFilterController {

    @Autowired
    private BlogFilterService blogFilterService;

    // Obtener filtros activos (público)
    @GetMapping("/public")
    public ResponseEntity<List<BlogFilterDto>> getActiveFilters() {
        List<BlogFilterDto> filters = blogFilterService.getActiveFilters();
        return ResponseEntity.ok(filters);
    }

    // Obtener filtros por tipo (público)
    @GetMapping("/public/type/{filterType}")
    public ResponseEntity<List<BlogFilterDto>> getFiltersByType(@PathVariable String filterType) {
        List<BlogFilterDto> filters = blogFilterService.getFiltersByType(filterType);
        return ResponseEntity.ok(filters);
    }

    // ENDPOINTS DE ADMIN

    // Obtener todos los filtros (admin)
    @GetMapping("/admin")
    public ResponseEntity<List<BlogFilterDto>> getAllFilters() {
        List<BlogFilterDto> filters = blogFilterService.getAllFilters();
        return ResponseEntity.ok(filters);
    }

    // Obtener filtro por ID (admin)
    @GetMapping("/admin/{id}")
    public ResponseEntity<BlogFilterDto> getFilterById(@PathVariable Long id) {
        Optional<BlogFilterDto> filter = blogFilterService.getFilterById(id);
        return filter.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nuevo filtro (admin)
    @PostMapping("/admin")
    public ResponseEntity<?> createFilter(@RequestBody Map<String, String> request) {
        try {
            String filterName = request.get("filterName");
            String filterType = request.get("filterType");
            String description = request.get("description");

            if (filterName == null || filterType == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "filterName and filterType are required"));
            }

            BlogFilterDto createdFilter = blogFilterService.createFilter(filterName, filterType, description);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFilter);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Internal server error"));
        }
    }

    // Actualizar filtro (admin)
    @PutMapping("/admin/{id}")
    public ResponseEntity<?> updateFilter(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        try {
            String filterName = (String) request.get("filterName");
            String filterType = (String) request.get("filterType");
            String description = (String) request.get("description");
            Boolean active = (Boolean) request.get("active");

            if (filterName == null || filterType == null) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "filterName and filterType are required"));
            }

            Optional<BlogFilterDto> updatedFilter = blogFilterService.updateFilter(id, filterName, filterType, description, active);
            return updatedFilter.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Internal server error"));
        }
    }

    // Activar/Desactivar filtro (admin)
    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<BlogFilterDto> toggleFilterStatus(@PathVariable Long id) {
        Optional<BlogFilterDto> updatedFilter = blogFilterService.toggleFilterStatus(id);
        return updatedFilter.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar filtro (admin)
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteFilter(@PathVariable Long id) {
        boolean deleted = blogFilterService.deleteFilter(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Inicializar filtros por defecto (admin)
    @PostMapping("/admin/initialize")
    public ResponseEntity<Map<String, String>> initializeDefaultFilters() {
        blogFilterService.initializeDefaultFilters();
        return ResponseEntity.ok(Map.of("message", "Default filters initialized successfully"));
    }
}