import React from 'react';
import { CheckCircle, Calendar, User, MapPin, Download, Package, Frown } from 'lucide-react';

const DeliveredOrdersTable = ({ orders = [], onDownloadPDF }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Número de Serie
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Productos
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <Frown className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos entregados</h3>
                      <p className="text-gray-500">Los pedidos completados aparecerán aquí</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order.seriesNumber}
                  className={`hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full mr-3"></div>
                      <span className="text-sm font-bold text-gray-900 font-mono text-nowrap">
                        {order.seriesNumber}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-teal-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {new Date(order.issuedAt).toLocaleDateString('es-PE')}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(order.issuedAt).toLocaleDateString('es-PE', { weekday: 'long' })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="max-w-[200px]">
                        <div className="text-sm text-gray-900 truncate" title={order.shippingAddress}>
                          {order.shippingAddress}
                        </div>
                        <div className="text-xs text-gray-500">Dirección de entrega</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center space-x-2 bg-orange-100 px-3 py-2 rounded-lg">
                      <Package className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-800">{order.details.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="text-right">
                      <div className="text-lg text-teal-600 text-nowrap">S/ {order.totalAmount.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {order.estate}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onDownloadPDF(order)}
                        className="group flex items-center px-4 py-2 text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer con información adicional */}
      {orders.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Total de pedidos: {orders.length}</span>
              <span>•</span>
              <span>Valor total: S/ {orders.reduce((sum, order) => sum + order.totalAmount, 0).toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-500">Actualizado: {new Date().toLocaleDateString('es-PE')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrdersTable;
