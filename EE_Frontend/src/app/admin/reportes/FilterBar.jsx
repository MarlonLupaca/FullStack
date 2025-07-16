import { useState } from 'react';
import { Calendar, Filter, ArrowUpDown, Download } from 'lucide-react';

const FilterBar = () => {
  const [filterPeriod, setFilterPeriod] = useState('mensual');

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
            >
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="anual">Anual</option>
            </select>
            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>

          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="mr-2 text-gray-500" size={16} />
            Filtros
          </button>
        </div>

        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <ArrowUpDown className="mr-2 text-gray-500" size={16} />
            Ordenar
          </button>
          <button className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            <Download className="mr-2" size={16} />
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
