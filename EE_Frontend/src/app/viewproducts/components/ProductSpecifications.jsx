const ProductSpecifications = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-5">Especificaciones Técnicas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-200">
            {product.materialInfo && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Material
                </th>
                <td className="py-3 text-gray-700">{product.materialInfo}</td>
              </tr>
            )}
            {product.dimensions && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Dimensiones
                </th>
                <td className="py-3 text-gray-700">{product.dimensions}</td>
              </tr>
            )}
            {product.weight && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Peso
                </th>
                <td className="py-3 text-gray-700">{product.weight}</td>
              </tr>
            )}
            {product.capacity && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Capacidad
                </th>
                <td className="py-3 text-gray-700">{product.capacity}</td>
              </tr>
            )}
            {product.origin && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Origen
                </th>
                <td className="py-3 text-gray-700">{product.origin}</td>
              </tr>
            )}
            {product.model && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Modelo
                </th>
                <td className="py-3 text-gray-700">{product.model}</td>
              </tr>
            )}
            {product.color && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  Color
                </th>
                <td className="py-3 text-gray-700">{product.color}</td>
              </tr>
            )}
            {product.sku && (
              <tr>
                <th scope="row" className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                  SKU
                </th>
                <td className="py-3 text-gray-700">{product.sku}</td>
              </tr>
            )}
            {/* Puedes agregar más especificaciones aquí según los datos de tu producto */}
          </tbody>
        </table>
      </div>
      {product.tags && product.tags.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-800 mb-3">Etiquetas:</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold transition-colors hover:bg-indigo-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifications;
