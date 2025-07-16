'use client';

import ClienteRow from './ClienteRow'; // Importa el nuevo componente

const ClientesTable = ({ filteredClientes, totalClientes, onDeleteClient, onEditClient, fetchClientes }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Usercode
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cliente
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contacto
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registro
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Compras
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Gastado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <ClienteRow
                  key={cliente.usercode}
                  cliente={cliente}
                  onDelete={onDeleteClient} // Pasar función para eliminar
                  onEdit={onEditClient} // Pasar función para editar
                  fetchClientes={fetchClientes}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron clientes con los filtros actuales
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredClientes.length}</span> de{' '}
            <span className="font-medium">{totalClientes}</span> clientes
          </div>
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
              Anterior
            </button>
            <button className="bg-teal-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-teal-700">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientesTable;
