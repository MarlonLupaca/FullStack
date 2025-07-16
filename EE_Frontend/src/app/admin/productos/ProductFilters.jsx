import { Search, Plus, ChevronDown } from 'lucide-react';

const ProductFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, handleAddNew, categories }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="flex items-center w-full md:w-1/2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border border-teal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative w-full md:w-40">
          <select
            className="appearance-none w-full px-4 py-2 border border-teal-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-200 pr-8"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
        </div>

        <button
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-teal-600 hover:bg-teal-700"
          onClick={handleAddNew}
        >
          <Plus size={18} />
          <span>Añadir</span>
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
