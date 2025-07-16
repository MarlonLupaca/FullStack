'use client';

import React, { useState, useMemo } from 'react';
import BlogHeader from './BlogHeader';
import BlogFilterSidebar from './BlogFilterSidebar';
import BlogGridCard from './BlogGridCard';
import posts from '../data/blogPosts';
import Image from 'next/image';
import { Search, Filter, X, Home, BookOpen, TrendingUp, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

const categories = [...new Set(posts.map((post) => post.category?.trim()).filter(Boolean))];
const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

const BlogContent = () => {
  const [filters, setFilters] = useState({
    search: '',
    tags: [],
    categories: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: prevFilters.categories.includes(category)
        ? prevFilters.categories.filter((c) => c !== category)
        : [...prevFilters.categories, category],
    }));
  };

  const handleTagToggle = (tag) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: prevFilters.tags.includes(tag) ? prevFilters.tags.filter((t) => t !== tag) : [...prevFilters.tags, tag],
    }));
  };

  const filteredPosts = useMemo(() => {
    const searchTerm = filters.search?.toLowerCase() || '';
    const filterTags = filters.tags || [];
    const filterCategories = filters.categories || [];

    return posts.filter((post) => {
      if (!post) return false;

      const postTitle = post.title?.toLowerCase() || '';
      const postSummary = post.summary?.toLowerCase() || '';
      const postContent = post.content?.toLowerCase() || '';
      const postCategory = post.category?.trim();

      const matchesSearch =
        searchTerm === '' ||
        postTitle.includes(searchTerm) ||
        postSummary.includes(searchTerm) ||
        postContent.includes(searchTerm);

      const matchesTags =
        filterTags.length === 0 ||
        (post.tags && Array.isArray(post.tags) && filterTags.some((tag) => post.tags.includes(tag)));

      const matchesCategory =
        filterCategories.length === 0 || (postCategory && filterCategories.includes(postCategory));

      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [filters]);

  const clearFilters = () => {
    setFilters({ search: '', tags: [], categories: [] });
  };

  const hasActiveFilters =
    filters.search !== '' || (filters.tags || []).length > 0 || (filters.categories || []).length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative">
        <div className="relative h-120 md:h-120 overflow-hidden">
          <Image src="/Img/Ecologia.jpg" fill alt="Blog ecológico" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-green-600/60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-green-300" />
                <span className="text-green-300 font-medium">Blog Ecológico</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Vive de manera más <span className="text-green-300">sostenible</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Descubre guías prácticas, consejos expertos e historias inspiradoras para transformar tu estilo de vida
                hacia la sostenibilidad.
              </p>
              <div className="flex flex-wrap gap-8 text-white/90">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">{posts.length} artículos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5" />
                  <span className="font-medium">{categories.length} categorías</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Actualizado semanalmente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-green-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Barra de búsqueda y filtros móviles */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtros
              {hasActiveFilters && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" />}
            </button>
          </div>

          {/* Filtros activos */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Filtros activos:</span>
              {(filters.categories || []).map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {category}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        categories: (prev.categories || []).filter((c) => c !== category),
                      }))
                    }
                    className="ml-2 hover:text-green-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {(filters.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        tags: (prev.tags || []).filter((t) => t !== tag),
                      }))
                    }
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-sm text-gray-600 hover:text-gray-900 underline">
                Limpiar todo
              </button>
            </div>
          )}
        </div>

        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-80 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <BlogHeader total={filteredPosts.length} />
              <BlogFilterSidebar
                categories={categories}
                tags={allTags}
                filters={filters}
                onFilterChange={handleFilterChange}
                onCategoryToggle={handleCategoryToggle}
                onTagToggle={handleTagToggle}
              />
            </div>
          </aside>

          {/* Artículos */}
          <main className="flex-1">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {hasActiveFilters ? 'Resultados de búsqueda' : 'Últimos artículos'}
                </h2>
                <span className="text-gray-600">
                  {filteredPosts.length} artículo{filteredPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogGridCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron artículos</h3>
                  <p className="text-gray-600 mb-6">
                    Intenta ajustar tus filtros o términos de búsqueda para encontrar lo que buscas.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
