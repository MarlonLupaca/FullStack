import VentasChart from '../chart/VentasChart';
import ProductosChart from '../chart/ProductosChart';
import { ventasData, productosMasVendidos } from '../mockData';

const VentasTab = () => {
  return (
    <div className="space-y-6">
      <VentasChart data={ventasData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductosChart data={productosMasVendidos} />

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Rendimiento por Canal</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Tienda Online</span>
                <span className="text-sm font-medium text-gray-700">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Marketplace</span>
                <span className="text-sm font-medium text-gray-700">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Ventas Directas</span>
                <span className="text-sm font-medium text-gray-700">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasTab;
