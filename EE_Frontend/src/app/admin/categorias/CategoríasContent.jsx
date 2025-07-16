'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import StatsBar from './StatsBar';
import CategoryList from './CategoryList';
import CategoryModal from './CategoryModal';
import SubcategoryModal from './SubcategoryModal';
import API_BASE_URL from '@/app/config/apiConfig';

const CategoriasContent = () => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState({});

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [subcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Gestión de categorías
  const handleAddCategory = () => {
    setCurrentCategory(null);
    setCategoryModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      const method = currentCategory ? 'PUT' : 'POST';
      const url = currentCategory
        ? `${API_BASE_URL}/categories/${currentCategory.categoryId}`
        : `${API_BASE_URL}/categories`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryData.nombre,
          description: categoryData.descripcion,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (currentCategory) {
        // Editar existente
        setCategorias(
          categorias.map((cat) => (cat.categoryId === data.categoryId ? { ...data, activa: cat.activa } : cat))
        ); // Mantener el estado 'activa'
      } else {
        // Crear nueva
        setCategorias([...categorias, { ...data, activa: true }]); // Nueva categoría activa por defecto
      }

      setCategoryModalOpen(false);
      fetchCategorias(); // Recargar las categorías para reflejar los cambios
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setCategorias(categorias.filter((cat) => cat.categoryId !== categoryId));
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
    }
  };

  const handleToggleStatus = async (categoryId, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setCategorias(
        categorias.map((cat) => (cat.categoryId === categoryId ? { ...cat, activa: !currentStatus } : cat))
      );
    } catch (error) {
      console.error('Error al cambiar el estado de la categoría:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="p-6  mx-auto bg-tertiary h-full">
      <Header onAddCategory={handleAddCategory} />

      <StatsBar categorias={categorias} subcategorias={subcategorias} />

      <CategoryList
        categorias={categorias}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        onToggleStatus={handleToggleStatus}
      />

      {categoryModalOpen && (
        <CategoryModal
          isOpen={categoryModalOpen}
          onClose={() => setCategoryModalOpen(false)}
          category={currentCategory}
          onSave={handleSaveCategory}
        />
      )}

      {subcategoryModalOpen && (
        <SubcategoryModal
          isOpen={subcategoryModalOpen}
          onClose={() => setSubcategoryModalOpen(false)}
          categoryId={selectedCategoryId}
          subcategory={currentSubcategory}
          onSave={handleSaveSubcategory}
          categorias={categorias}
        />
      )}
    </div>
  );
};

export default CategoriasContent;
