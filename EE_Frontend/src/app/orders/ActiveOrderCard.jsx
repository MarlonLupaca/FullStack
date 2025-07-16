import React from 'react';
import { Package, MapPin, Download } from 'lucide-react';
import OrderTimeline from './OrderTimeline'; // Ajusta la ruta según tu estructura

const ActiveOrderCard = ({ order, onDownloadPDF }) => {
  const statusColors = {
    Procesando: 'bg-yellow-100 text-yellow-800',
    Entregado: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{order.seriesNumber}</h3>
          <p className="text-gray-600 text-sm">
            {new Date(order.issuedAt).toLocaleDateString('es-PE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.estate]}`}>
          {order.estate}
        </span>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Estado del Pedido:</h4>
        <OrderTimeline order={order} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-teal-500" />
          <span>{order.shippingAddress}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Package className="w-4 h-4 mr-2 text-teal-500" />
          <span>{order.details.length} producto(s)</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-lg font-semibold text-teal-600">S/ {order.totalAmount.toFixed(2)}</span>
          <button
            onClick={() => onDownloadPDF(order)}
            className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Boleta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveOrderCard;
