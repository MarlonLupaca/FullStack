'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import ProductsHeader from './ProductsHeader';
import { useProducts } from '../context/ProductContext';
import API_BASE_URL from '../config/apiConfig';

const ProductsContent = () => {
  const { addProduct, updateProductQuantity } = useProducts();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilters, setActiveFilters] = useState({
    categories: [],
  });

  const [sortOption, setSortOption] = useState('popularity');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error('No se pudo obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
      return false;
    }
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.isNew ? 1 : -1;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="relative mb-8 rounded-xl overflow-hidden h-64">
        <img src="./Img/banner-eco.jpg" alt="Productos ecológicos" className="w-full h-full object-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="ml-10 max-w-lg">
            <p className="text-3xl md:text-4xl font-bold text-white mb-4">Productos Ecológicos</p>
            <p className="text-white/90 mb-6">
              Cuida el planeta con nuestra selección de productos sostenibles y respetuosos con el medio ambiente.
            </p>
            <button className="cursor-pointer bg-white text-primary hover:bg-gray-100 font-bold py-2 px-6 rounded-md">
              Ver ofertas
            </button>
          </div>
        </div>
      </div>

      <div className="flex text-sm text-gray-500 mb-6">
        <a href="#" className="hover:text-primary">
          Inicio
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Productos Ecológicos</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <FilterSidebar
            categories={Array.from(new Set(products.map((product) => product.category)))}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <main className="flex-1">
          <ProductsHeader total={sortedProducts.length} onSortChange={handleSortChange} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.reverse().map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                addProduct={addProduct}
                updateProductQuantity={updateProductQuantity}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
              <button
                className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-md"
                onClick={() => setActiveFilters({ categories: [] })}
              >
                Borrar filtros
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsContent;
