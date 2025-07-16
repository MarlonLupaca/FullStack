import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '@/app/config/apiConfig';

const ProductModal = ({ isModalOpen, setIsModalOpen, fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    longDescription: '',
    category: '',
    price: '',
    discount: '',
    rating: '',
    reviewCount: '',
    stock: '',
    isNew: false,
    isActive: true,
    materialInfo: '',
    dimensions: '',
    weight: '',
    capacity: '',
    care: '',
    warranty: '',
    origin: '',
    tags: '',
    highlights: '',
  });
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorLoadingCategories, setErrorLoadingCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorLoadingCategories(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorLoadingCategories('Error al cargar las categorías.');
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const prepareFormDataToSend = () => {
    const formDataToSendObject = { ...formData };

    if (formDataToSendObject.tags) {
      formDataToSendObject.tags = formDataToSendObject.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');
    } else {
      formDataToSendObject.tags = [];
    }

    if (formDataToSendObject.highlights) {
      formDataToSendObject.highlights = formDataToSendObject.highlights
        .split(',')
        .map((highlight) => highlight.trim())
        .filter((highlight) => highlight !== '');
    } else {
      formDataToSendObject.highlights = [];
    }

    const formDataToSend = new FormData();
    formDataToSend.append('product', JSON.stringify(formDataToSendObject));
    if (image) {
      formDataToSend.append('image', image);
    }

    return formDataToSend;
  };

  const handleCreateProduct = async () => {
    setUploading(true);
    setUploadError(null);

    const formDataToSend = prepareFormDataToSend();

    try {
      const response = await axios.post(`${API_BASE_URL}/products`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Producto creado exitosamente', response.data);
      setUploading(false);
      setIsModalOpen(false);
      if (fetchProducts) {
        fetchProducts(); // Recargar la lista de productos
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setUploading(false);
      setUploadError('Error al crear el producto. Por favor, intenta nuevamente.');
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
        setUploadError(`Error: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        setUploadError('Error: No se pudo conectar con el servidor.');
      } else {
        console.error('Error al configurar la petición:', error.message);
        setUploadError('Error al configurar la petición.');
      }
    }
  };

  const handleSubmit = () => {
    handleCreateProduct();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b px-6 py-3">
          <h3 className="text-lg font-medium text-teal-800">Añadir Nuevo Producto</h3>
          <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-4">
            {/* Campos del formulario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-teal-600 rounded-md"
                required
              />
            </div>

            {/* Imagen */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del producto (opcional)
              </label>
              <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 005.656 0L28 32m32-12l-3.172 3.172a4 4 0 01-5.656 0L28 16M8 16l9.172 9.172a4 4 0 015.656 0L28 16"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600 text-center">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                    >
                      <span className=" w-50 block">Subir un archivo</span>
                      <input id="image" name="image" type="file" className="sr-only" onChange={handleImageChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF hasta10MB</p>
                </div>
              </div>
              {image && (
                <div className="mt-2">
                  <p className="text-gray-700 text-sm">Imagen seleccionada:</p>
                  <img src={URL.createObjectURL(image)} alt="Vista previa" className="max-h-20 rounded-md" />
                </div>
              )}
            </div>

            {/* Descripciones */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción corta*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-teal-600 rounded-md"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción larga</label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-teal-600 rounded-md"
              />
            </div>

            {/* Categoría y Precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría*</label>
                {loadingCategories ? (
                  <div className="text-gray-500">Cargando categorías...</div>
                ) : errorLoadingCategories ? (
                  <div className="text-red-500">{errorLoadingCategories}</div>
                ) : (
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-teal-600 rounded-md"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name} ({category.categoryId})
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">S/</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-3 py-2 border border-teal-600 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Descuento y Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descuento</label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0%"
                  className="w-full px-3 py-2 border border-teal-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-teal-600 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Otros campos numéricos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-teal-600 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad de reseñas</label>
                <input
                  type="number"
                  min="0"
                  name="reviewCount"
                  value={formData.reviewCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-teal-600 rounded-md"
                />
              </div>
            </div>

            {/* Campos adicionales de texto */}
            {[
              { label: 'Material', name: 'materialInfo' },
              { label: 'Dimensiones', name: 'dimensions' },
              { label: 'Peso', name: 'weight' },
              { label: 'Capacidad', name: 'capacity' },
              { label: 'Cuidados', name: 'care' },
              { label: 'Garantía', name: 'warranty' },
              { label: 'Origen', name: 'origin' },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-teal-600 rounded-md"
                />
              </div>
            ))}

            {/* Tags y Highlights como texto separado por comas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (separados por coma)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="ergonómica, oficina"
                className="w-full px-3 py-2 border border-teal-600 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Puntos destacados (separados por coma)
              </label>
              <input
                type="text"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                placeholder="Diseño moderno, Material resistente"
                className="w-full px-3 py-2 border border-teal-600 rounded-md"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                Producto nuevo
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                Producto activo
              </label>
            </div>

            {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 rounded-md shadow-sm text-sm text-white bg-teal-600 hover:bg-teal-700 flex items-center"
                disabled={uploading || loadingCategories}
              >
                <Save size={16} className="mr-2" />
                {uploading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
