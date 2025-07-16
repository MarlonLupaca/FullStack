import { Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import Pagination from './Pagination';
import { useState } from 'react';
import axios from 'axios';
import EditProductModal from './EditProductModal'; // Importa el modal de edición
import ProductModal from './ProductModal'; // Asegúrate de tener también el modal de creación
import API_BASE_URL from '@/app/config/apiConfig';

const ProductTable = ({
  filteredProducts,
  currentPage,
  totalPages,
  indexOfFirstProduct,
  indexOfLastProduct,
  prevPage,
  nextPage,
  paginate,
  loading,
  error,
  fetchProducts,
}) => {
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar el modal de edición
  const [productToEdit, setProductToEdit] = useState(null); // Estado para almacenar el producto a editar
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para el modal de creación

  const handleActivateDeactivate = async (productId, shouldActivate) => {
    setUpdatingProduct(productId);
    const url = `${API_BASE_URL}/products/${productId}/${shouldActivate ? 'activate' : 'deactivate'}`;
    try {
      await axios.patch(url);
      fetchProducts();
    } catch (error) {
      console.error('Error activating/deactivating product:', error);
    } finally {
      setUpdatingProduct(null);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <div className="text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Modal de Creación */}
      <ProductModal
        isModalOpen={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        fetchProducts={fetchProducts}
      />

      {/* Modal de Edición */}
      <EditProductModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        initialFormData={productToEdit}
        fetchProducts={fetchProducts}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-teal-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Descuento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Valoración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => {
                const imageUrl = `${API_BASE_URL}${product.imageUrl}`;
                return (
                  <tr key={product.code}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[350px]">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[350px]">{product.description}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">S/ {product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.discount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.rating} ({product.reviewCount})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.isActive ? 'Activo' : 'Desactivo'}
                        </span>
                        <button
                          onClick={() => handleActivateDeactivate(product.code, !product.isActive)}
                          className={`flex items-center text-sm font-semibold rounded-md py-1 px-2 ${
                            product.isActive
                              ? 'bg-yellow-500 hover:bg-yellow-700 text-white'
                              : 'bg-green-500 hover:bg-green-700 text-white'
                          }`}
                          disabled={updatingProduct === product.code}
                        >
                          {updatingProduct === product.code ? (
                            'Cambiando...'
                          ) : product.isActive ? (
                            <ToggleLeft size={16} />
                          ) : (
                            <ToggleRight size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900">
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstProduct={indexOfFirstProduct}
          indexOfLastProduct={indexOfLastProduct}
          filteredProducts={filteredProducts}
          prevPage={prevPage}
          nextPage={nextPage}
          paginate={paginate}
        />
      )}

      {/* Botón para abrir el modal de creación */}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:ring-2 focus-visible:ring-white"
        >
          Añadir Nuevo Producto
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
