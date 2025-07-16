import { Search, ChevronDown, PlusCircle } from 'lucide-react';

const PedidosSearch = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar por ID o cliente..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <select
              className="appearance-none bg-white border border-gray-300 py-2 pl-4 pr-10 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="enviado">Enviados</option>
              <option value="entregado">Entregados</option>
              <option value="cancelado">Cancelados</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            <span>Nuevo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidosSearch;
