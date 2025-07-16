import { Users, ShoppingBag, CreditCard, UserX } from 'lucide-react';

const ClientesStats = ({ clientes }) => {
  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter((c) => c.active).length;
  const clientesInactivos = clientes.filter((c) => !c.active).length;
  const totalCompras = clientes.reduce((total, cliente) => total + cliente.purchaseCount, 0);
  const totalGastado = clientes.reduce((total, cliente) => total + cliente.totalSpent, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Clientes</p>
            <p className="text-2xl font-bold">{totalClientes}</p>
          </div>
          <div className="bg-teal-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-teal-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Clientes Activos</p>
            <p className="text-2xl font-bold">{clientesActivos}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Compras</p>
            <p className="text-2xl font-bold">{totalCompras}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Gastado</p>
            <p className="text-2xl font-bold">S/. {totalGastado?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <CreditCard className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientesStats;
