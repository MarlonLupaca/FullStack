'use client';
import { useState, useEffect } from 'react';
import ProductFilters from './ProductFilters';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal'; // Modal para crear
import EditProductModal from './EditProductModal'; // Modal para editar
import axios from 'axios';
import API_BASE_URL from '@/app/config/apiConfig';

const ProductosContent = () => {
  //fetch
  const [products, setProducts] = useState([]);

  // Estados para la gestión de la UI
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para el modal de creación
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
  const [productToEdit, setProductToEdit] = useState(null); // Estado para almacenar el producto a editar
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categorías disponibles
  const categories = ['Todos', 'Cocina', 'Baño', 'Hogar'];

  // Obtener productos filtrados y paginados
  const filteredProducts = products.filter((product) => {
    return (
      (categoryFilter === 'Todos' || product.category === categoryFilter) &&
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      // Invertir el orden de los productos al recibirlos
      setProducts(response.data.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Abrir modal para añadir producto
  const handleAddNew = () => {
    setIsCreateModalOpen(true);
  };

  // Abrir modal para editar producto
  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  // Cambiar página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Ir a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-min-[90vh]">
      {/* Cabecera */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
        <p className="text-gray-600 mt-2">Administra tu catálogo de productos ecológicos</p>
      </div>

      {/* Filtros y búsqueda */}
      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        handleAddNew={handleAddNew}
        categories={categories}
      />

      {/* Tabla de productos */}
      <ProductTable
        filteredProducts={filteredProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
        prevPage={prevPage}
        nextPage={nextPage}
        paginate={paginate}
        loading={loading}
        error={error}
        fetchProducts={fetchProducts}
        handleEdit={handleEdit} // Pasar la función handleEdit a la tabla
      />

      {/* Modal para Añadir producto */}
      {isCreateModalOpen && (
        <ProductModal
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          fetchProducts={fetchProducts}
        />
      )}

      {/* Modal para Editar producto */}
      {isEditModalOpen && (
        <EditProductModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          initialFormData={productToEdit}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductosContent;
