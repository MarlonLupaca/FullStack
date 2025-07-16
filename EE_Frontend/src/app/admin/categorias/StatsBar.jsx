import { Leaf, BoxIcon, Tag, AlertTriangle } from 'lucide-react';

const StatsBar = ({ categorias, subcategorias }) => {
  // Calcular estadísticas
  const totalCategorias = categorias.length;
  const categoriasActivas = categorias.filter((cat) => cat.activa).length;

  // Contar todas las subcategorías
  const totalSubcategorias = Object.values(subcategorias).reduce((total, subcat) => total + subcat.length, 0);

  // Categorías sin subcategorías
  const categoriasSinSub = categorias.filter(
    (cat) => !subcategorias[cat.id] || subcategorias[cat.id].length === 0
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Categorías</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalCategorias}</p>
          </div>
          <div className="p-2 rounded-full bg-teal-100 text-teal-600">
            <Tag size={20} />
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">Total {totalCategorias} categorías</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Categorías Activas</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{categoriasActivas}</p>
          </div>
          <div className="p-2 rounded-full bg-green-100 text-green-600">
            <Leaf size={20} />
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">
          {categoriasActivas} de {totalCategorias}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Categorías con Subcategorías</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalCategorias - categoriasSinSub}</p>
          </div>
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <BoxIcon size={20} />
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">En {totalCategorias - categoriasSinSub} categorías</div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Sin Subcategorías</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{categoriasSinSub}</p>
          </div>
          <div className="p-2 rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={20} />
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">De {totalCategorias} categorías</div>
      </div>
    </div>
  );
};

export default StatsBar;
