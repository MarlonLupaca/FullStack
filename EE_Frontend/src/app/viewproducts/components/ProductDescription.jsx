const ProductDescription = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-xl font-semibold text-gray-800 mb-5">Acerca de este Producto</p>
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700 leading-relaxed">
          {product.longDescription || 'No hay descripción detallada disponible.'}
        </p>
      </div>

      {product.care && (
        <div className="mt-6 p-5 bg-gray-100 rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-3">Cuidado del Producto</p>
          <p className="text-gray-600 leading-relaxed">{product.care}</p>
        </div>
      )}

      {product.warranty && (
        <div className="mt-4 p-5 bg-gray-100 rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-3">Información de Garantía</p>
          <p className="text-gray-600 leading-relaxed">{product.warranty}</p>
        </div>
      )}

      {!product.care && !product.warranty && (
        <p className="text-gray-500 italic mt-4">
          No se proporcionaron instrucciones de cuidado ni información de garantía.
        </p>
      )}
    </div>
  );
};

export default ProductDescription;
