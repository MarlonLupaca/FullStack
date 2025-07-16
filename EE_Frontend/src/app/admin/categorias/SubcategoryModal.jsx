import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const SubcategoryModal = ({ isOpen, onClose, categoryId, subcategory, onSave, categorias }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoryId: categoryId || '',
  });

  useEffect(() => {
    if (subcategory) {
      setFormData({
        nombre: subcategory.nombre || '',
        categoryId: categoryId || '',
      });
    } else {
      setFormData({
        nombre: '',
        categoryId: categoryId || '',
      });
    }
  }, [subcategory, categoryId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: subcategory?.id || Date.now(),
    });
  };

  if (!isOpen) return null;

  const categoryName = categorias.find((cat) => cat.id === parseInt(formData.categoryId))?.nombre || '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">
            {subcategory ? 'Editar Subcategoría' : 'Nueva Subcategoría'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría Principal*
            </label>
            {categoryId ? (
              <input
                type="text"
                value={categoryName}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled
              />
            ) : (
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la subcategoría*
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-teal-700"
            >
              {subcategory ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubcategoryModal;
