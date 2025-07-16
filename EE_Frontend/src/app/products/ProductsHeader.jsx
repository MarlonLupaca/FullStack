import React from "react";

const ProductsHeader = ({ total, onSortChange }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">
        Productos Ecológicos{" "}
        <span className="text-sm font-normal text-gray-500">
          ({total} productos)
        </span>
      </h2>

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
