import React from 'react';

const BlogHeader = () => {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8 shadow-md">
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 bg-teal-100">
        <p className="mt-2 text-lg text-black font-medium drop-shadow">
          Aquí encontrarás novedades, presentaciones de productos, noticias y logros de nuestra empresa ecológica.
        </p>
      </div>
    </div>
  );
};

export default BlogHeader;
