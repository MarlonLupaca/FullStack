import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  indexOfFirstProduct,
  indexOfLastProduct,
  filteredProducts,
  prevPage,
  nextPage,
  paginate,
}) => {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Siguiente
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{indexOfFirstProduct + 1}</span> a{' '}
            <span className="font-medium">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> de{' '}
            <span className="font-medium">{filteredProducts.length}</span> resultados
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Botones de página */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === i + 1
                    ? 'z-10 border-teal-600 bg-teal-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
