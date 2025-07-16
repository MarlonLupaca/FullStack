const ProductosTab = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Análisis de Productos</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Producto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ventas
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Margen
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Producto A</td>
              <td className="px-6 py-4 whitespace-nowrap">S/ 2,350</td>
              <td className="px-6 py-4 whitespace-nowrap">45 unidades</td>
              <td className="px-6 py-4 whitespace-nowrap">28%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Activo
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Producto B</td>
              <td className="px-6 py-4 whitespace-nowrap">S/ 1,680</td>
              <td className="px-6 py-4 whitespace-nowrap">32 unidades</td>
              <td className="px-6 py-4 whitespace-nowrap">25%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Activo
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Producto C</td>
              <td className="px-6 py-4 whitespace-nowrap">S/ 1,020</td>
              <td className="px-6 py-4 whitespace-nowrap">18 unidades</td>
              <td className="px-6 py-4 whitespace-nowrap">30%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Bajo stock
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Producto D</td>
              <td className="px-6 py-4 whitespace-nowrap">S/ 600</td>
              <td className="px-6 py-4 whitespace-nowrap">8 unidades</td>
              <td className="px-6 py-4 whitespace-nowrap">22%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  Sin stock
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductosTab;
