'use client';

import React from 'react';

const BlogFilterSidebar = ({ categories, tags, filters, onCategoryToggle, onTagToggle }) => {
  return (
    <div className="space-y-6">
      {/* Filtro por categoría */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${index}`}
                checked={(filters.categories || []).includes(category)}
                onChange={() => onCategoryToggle(category)}
                className="mr-2"
              />
              <label htmlFor={`category-${index}`} className="text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro por etiquetas (tags) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Etiquetas</h3>
        <div className="space-y-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`tag-${index}`}
                checked={(filters.tags || []).includes(tag)}
                onChange={() => onTagToggle(tag)}
                className="mr-2"
              />
              <label htmlFor={`tag-${index}`} className="text-gray-700">
                #{tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogFilterSidebar;
