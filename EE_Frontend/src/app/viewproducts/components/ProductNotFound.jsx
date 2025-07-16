import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

const ProductNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-tertiary">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
        <p className="text-gray-600 mb-6">Lo sentimos, no pudimos encontrar el producto que buscas.</p>
        <Link
          href="/"
          className="inline-flex items-center bg-teal-600 text-white py-2 px-4 rounded-md font-medium hover:bg-teal-700 transition"
        >
          <FaArrowLeftLong className="mr-2" />
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
