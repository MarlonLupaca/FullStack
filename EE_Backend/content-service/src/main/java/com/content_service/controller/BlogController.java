package com.content_service.controller;

import com.content_service.dto.BlogDto;
import com.content_service.dto.BlogCreateDto;
import com.content_service.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blogs")
@CrossOrigin(origins = "*")
public class BlogController {

    @Autowired
    private BlogService blogService;

    // Obtener todos los blogs publicados (público)
    @GetMapping("/public")
    public ResponseEntity<Page<BlogDto>> getPublishedBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Page<BlogDto> blogs = blogService.getAllPublishedBlogs(page, size, sortBy, sortDir);
        return ResponseEntity.ok(blogs);
    }

    // Obtener blog por ID (público)
    @GetMapping("/public/{id}")
    public ResponseEntity<BlogDto> getBlogById(@PathVariable Long id) {
        Optional<BlogDto> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Buscar blogs con filtros (público)
    @GetMapping("/public/search")
    public ResponseEntity<Page<BlogDto>> searchBlogs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Page<BlogDto> blogs = blogService.searchBlogs(category, author, true, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(blogs);
    }

    // Obtener blogs por categoría (público)
    @GetMapping("/public/category/{category}")
    public ResponseEntity<Page<BlogDto>> getBlogsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<BlogDto> blogs = blogService.getBlogsByCategory(category, page, size);
        return ResponseEntity.ok(blogs);
    }

    // Obtener blogs por autor (público)
    @GetMapping("/public/author/{author}")
    public ResponseEntity<Page<BlogDto>> getBlogsByAuthor(
            @PathVariable String author,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<BlogDto> blogs = blogService.getBlogsByAuthor(author, page, size);
        return ResponseEntity.ok(blogs);
    }

    // Buscar por palabra clave (público)
    @GetMapping("/public/keyword")
    public ResponseEntity<Page<BlogDto>> searchByKeyword(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<BlogDto> blogs = blogService.searchByKeyword(keyword, page, size);
        return ResponseEntity.ok(blogs);
    }

    // Obtener categorías disponibles (público)
    @GetMapping("/public/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = blogService.getCategories();
        return ResponseEntity.ok(categories);
    }

    // Obtener autores disponibles (público)
    @GetMapping("/public/authors")
    public ResponseEntity<List<String>> getAuthors() {
        List<String> authors = blogService.getAuthors();
        return ResponseEntity.ok(authors);
    }

    // Buscar por rango de fechas (público)
    @GetMapping("/public/date-range")
    public ResponseEntity<Page<BlogDto>> getBlogsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<BlogDto> blogs = blogService.getBlogsByDateRange(startDate, endDate, page, size);
        return ResponseEntity.ok(blogs);
    }

    // === ENDPOINTS DE ADMINISTRACIÓN ===

    // Obtener todos los blogs (admin)
    @GetMapping("/admin")
    public ResponseEntity<Page<BlogDto>> getAllBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Page<BlogDto> blogs = blogService.getAllBlogs(page, size, sortBy, sortDir);
        return ResponseEntity.ok(blogs);
    }

    // Buscar blogs con todos los filtros (admin)
    @GetMapping("/admin/search")
    public ResponseEntity<Page<BlogDto>> adminSearchBlogs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Boolean published,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Page<BlogDto> blogs = blogService.searchBlogs(category, author, published, keyword, page, size, sortBy, sortDir);
        return ResponseEntity.ok(blogs);
    }

    // Crear nuevo blog (admin)
    @PostMapping("/admin")
    public ResponseEntity<BlogDto> createBlog(@RequestBody BlogCreateDto createDto) {
        try {
            BlogDto createdBlog = blogService.createBlog(createDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBlog);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Actualizar blog (admin)
    @PutMapping("/admin/{id}")
    public ResponseEntity<BlogDto> updateBlog(@PathVariable Long id, @RequestBody BlogCreateDto updateDto) {
        Optional<BlogDto> updatedBlog = blogService.updateBlog(id, updateDto);
        return updatedBlog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Eliminar blog (admin)
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        boolean deleted = blogService.deleteBlog(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Obtener blog por ID (admin - incluye no publicados)
    @GetMapping("/admin/{id}")
    public ResponseEntity<BlogDto> getAdminBlogById(@PathVariable Long id) {
        Optional<BlogDto> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}