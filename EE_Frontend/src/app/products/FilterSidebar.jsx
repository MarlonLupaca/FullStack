'use client';

import React, { useState } from 'react';

const FilterSidebar = ({ categories, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange: priceRange,
    });
  };

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-primary mb-4">Filtros</h3>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Categorías</h4>
        {categories.map((category, index) => (
          <div className="flex items-center mb-2" key={index}>
            <input
              type="checkbox"
              id={`category-${index}`}
              className="mr-2"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${index}`} className="text-gray-600">
              {category}
            </label>
          </div>
        ))}
      </div>

      {/* Botón aplicar */}
      <button
        className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 rounded-md transition-colors"
        onClick={applyFilters}
      >
        Aplicar filtros
      </button>
    </div>
  );
};

export default FilterSidebar;
