import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const PedidosStats = ({ pedidos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Pedidos</p>
            <p className="text-2xl font-bold">{pedidos.length}</p>
          </div>
          <div className="bg-teal-100 p-3 rounded-full">
            <Package className="h-6 w-6 text-teal-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Pendientes</p>
            <p className="text-2xl font-bold">{pedidos.filter((p) => p.status === 'pendiente').length}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <Clock className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Entregados</p>
            <p className="text-2xl font-bold">{pedidos.filter((p) => p.status === 'entregado').length}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Cancelados</p>
            <p className="text-2xl font-bold">{pedidos.filter((p) => p.status === 'cancelado').length}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <XCircle className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PedidosStats;
