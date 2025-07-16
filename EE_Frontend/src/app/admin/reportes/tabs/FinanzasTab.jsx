import FinanzasChart from '../chart/FinanzasChart';
import { analisisFinanciero } from '../mockData';

const FinanzasTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinanzasChart data={analisisFinanciero} />

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Indicadores Financieros</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">ROI</p>
                <p className="text-lg font-semibold">24.8%</p>
              </div>
              <div className="text-green-500">+2.1%</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Margen Bruto</p>
                <p className="text-lg font-semibold">35.6%</p>
              </div>
              <div className="text-green-500">+0.8%</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Costo por Venta</p>
                <p className="text-lg font-semibold">S/ 12.40</p>
              </div>
              <div className="text-red-500">+1.5%</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Valor de Cliente</p>
                <p className="text-lg font-semibold">S/ 320</p>
              </div>
              <div className="text-green-500">+5.2%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Proyección Financiera</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Periodo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ingresos Est.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gastos Est.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ganancia Est.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Crecimiento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Q3 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 25,400</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 18,750</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 6,650</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600">+8.2%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Q4 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 32,800</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 24,200</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 8,600</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-600">+12.5%</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Q1 2026</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 28,500</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 21,100</td>
                <td className="px-6 py-4 whitespace-nowrap">S/ 7,400</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-red-600">-5.8%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanzasTab;
