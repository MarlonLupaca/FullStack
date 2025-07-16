import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); 
  };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSearch} className="w-full max-w-lg flex items-center space-x-3 border-2 border-gray-300 rounded-full p-2 bg-white shadow-md focus-within:ring-2 ring-blue-500">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className="w-full p-2 rounded-full border-0 focus:outline-none focus:ring-0 text-lg text-black" 
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
