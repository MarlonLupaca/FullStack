'use client';
import { Download, RefreshCcw } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import RootGreenReceipt from './RootGreenReceipt';
import StatusIcon from './StatusIcon';
import { formatStatus } from './formatUtils';

const PedidosTable = ({ filteredPedidos, totalPedidos }) => {
  // Generar y descargar el PDF
  const handleDownloadPdf = async (pedido) => {
    try {
      const blob = await pdf(<RootGreenReceipt order={pedido} />).toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Pedido-${pedido.seriesNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  // Cambiar estado (sólo en frontend por ahora)
  const handleToggleStatus = (pedidoId) => {
    console.log(`Cambiar estado del pedido ${pedidoId}`);
    // Aquí implementarás el cambio real más adelante
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPedidos.length > 0 ? (
              filteredPedidos.map((pedido) => (
                <tr key={pedido.seriesNumber} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-teal-600">{pedido.seriesNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {pedido.customer.firstName} {pedido.customer.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{new Date(pedido.issuedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">S/. {pedido.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pedido.details.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <StatusIcon status={pedido.estate} />
                      <span className="ml-2 text-sm text-gray-700">{formatStatus(pedido.estate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-teal-600 hover:text-teal-800"
                        onClick={() => handleToggleStatus(pedido.seriesNumber)}
                      >
                        <RefreshCcw className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" onClick={() => handleDownloadPdf(pedido)}>
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron pedidos con los filtros actuales
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredPedidos.length}</span> de{' '}
            <span className="font-medium">{totalPedidos}</span> pedidos
          </div>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm rounded-md hover:bg-gray-50">
              Anterior
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 text-sm rounded-md hover:bg-teal-700">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidosTable;
