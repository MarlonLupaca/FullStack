import React from 'react';

const ProductsHeader = ({ total, onSortChange }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-2 pb-4">
      <p className="text-2xl font-bold text-gray-800 flex lg:block flex-col gap-1 lg:mb-0 mb-4">
        <span>Productos Ecológicos</span>
        <span className="text-sm font-normal text-gray-500 ml-3">({total} productos)</span>
      </p>

      <div className="flex items-center">
        <label htmlFor="sort" className="mr-2 text-gray-600">
          Ordenar por:
        </label>
        <select
          id="sort"
          className="border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:border-primary"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="popularity">Popularidad</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="newest">Más recientes</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsHeader;
