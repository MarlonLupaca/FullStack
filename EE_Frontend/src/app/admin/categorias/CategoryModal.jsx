import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const CategoryModal = ({ isOpen, onClose, category, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        nombre: category.name || '',
        descripcion: category.description || '',
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
      });
    }
  }, [category, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Envía solo nombre y descripción
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la categoría*
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

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
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
              {category ? 'Guardar Cambios' : 'Crear Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
