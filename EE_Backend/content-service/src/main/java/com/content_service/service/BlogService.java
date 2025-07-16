package com.content_service.service;

import com.content_service.dto.BlogDto;
import com.content_service.dto.BlogCreateDto;
import com.content_service.entity.Blog;
import com.content_service.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    // Obtener todos los blogs publicados con paginación
    public Page<BlogDto> getAllPublishedBlogs(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Blog> blogs = blogRepository.findByPublishedTrue(pageable);

        return blogs.map(this::convertToDto);
    }

    // Obtener blog por ID
    public Optional<BlogDto> getBlogById(Long id) {
        return blogRepository.findById(id).map(this::convertToDto);
    }

    // Crear nuevo blog
    public BlogDto createBlog(BlogCreateDto createDto) {
        Blog blog = new Blog();
        blog.setTitle(createDto.getTitle());
        blog.setContent(createDto.getContent());
        blog.setSummary(createDto.getSummary());
        blog.setAuthor(createDto.getAuthor());
        blog.setCategory(createDto.getCategory());
        blog.setImageUrl(createDto.getImageUrl());
        blog.setPublished(createDto.getPublished());

        Blog savedBlog = blogRepository.save(blog);
        return convertToDto(savedBlog);
    }

    // Actualizar blog
    public Optional<BlogDto> updateBlog(Long id, BlogCreateDto updateDto) {
        return blogRepository.findById(id).map(blog -> {
            blog.setTitle(updateDto.getTitle());
            blog.setContent(updateDto.getContent());
            blog.setSummary(updateDto.getSummary());
            blog.setAuthor(updateDto.getAuthor());
            blog.setCategory(updateDto.getCategory());
            blog.setImageUrl(updateDto.getImageUrl());
            blog.setPublished(updateDto.getPublished());

            Blog savedBlog = blogRepository.save(blog);
            return convertToDto(savedBlog);
        });
    }

    // Eliminar blog
    public boolean deleteBlog(Long id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Buscar blogs con filtros
    public Page<BlogDto> searchBlogs(String category, String author, Boolean published,
                                     String keyword, int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Blog> blogs = blogRepository.findWithFilters(category, author, published, keyword, pageable);

        return blogs.map(this::convertToDto);
    }

    // Buscar por categoría
    public Page<BlogDto> getBlogsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blog> blogs = blogRepository.findByCategoryAndPublishedTrue(category, pageable);
        return blogs.map(this::convertToDto);
    }

    // Buscar por autor
    public Page<BlogDto> getBlogsByAuthor(String author, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blog> blogs = blogRepository.findByAuthorAndPublishedTrue(author, pageable);
        return blogs.map(this::convertToDto);
    }

    // Buscar por palabra clave
    public Page<BlogDto> searchByKeyword(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blog> blogs = blogRepository.findByKeyword(keyword, pageable);
        return blogs.map(this::convertToDto);
    }

    // Obtener categorías disponibles
    public List<String> getCategories() {
        return blogRepository.findDistinctCategories();
    }

    // Obtener autores disponibles
    public List<String> getAuthors() {
        return blogRepository.findDistinctAuthors();
    }

    // Buscar por rango de fechas
    public Page<BlogDto> getBlogsByDateRange(LocalDateTime startDate, LocalDateTime endDate,
                                             int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Blog> blogs = blogRepository.findByDateRange(startDate, endDate, pageable);
        return blogs.map(this::convertToDto);
    }

    // Obtener todos los blogs (para admin)
    public Page<BlogDto> getAllBlogs(int page, int size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Blog> blogs = blogRepository.findAll(pageable);

        return blogs.map(this::convertToDto);
    }

    // Convertir Entity a DTO
    private BlogDto convertToDto(Blog blog) {
        return new BlogDto(
                blog.getId(),
                blog.getTitle(),
                blog.getContent(),
                blog.getSummary(),
                blog.getAuthor(),
                blog.getCategory(),
                blog.getImageUrl(),
                blog.getPublished(),
                blog.getCreatedAt(),
                blog.getUpdatedAt()
        );
    }
}