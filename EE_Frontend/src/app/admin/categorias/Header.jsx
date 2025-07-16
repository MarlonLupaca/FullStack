import { PlusCircle, Search } from 'lucide-react';

const Header = ({ onAddCategory }) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categorías de Productos</h1>
        <p className="text-gray-600">Gestiona las categorías de productos ecológicos</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar categorías..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 w-full"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={onAddCategory}
          className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
        >
          <PlusCircle className="mr-2" size={18} />
          Nueva Categoría
        </button>
      </div>
    </div>
  );
};

export default Header;
