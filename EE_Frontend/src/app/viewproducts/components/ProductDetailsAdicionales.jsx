import { FaTruck, FaShield, FaRotate } from 'react-icons/fa6';

const ProductDetailsAdicionales = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center flex-col text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <FaTruck className="w-8 h-8 text-teal-600 mb-3" />
          <span className="font-medium text-gray-800">Envío gratis</span>
          <span className="text-sm text-gray-500 mt-1">En pedidos superiores a S/50</span>
        </div>
        <div className="flex items-center flex-col text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <FaShield className="w-8 h-8 text-teal-600 mb-3" />
          <span className="font-medium text-gray-800">Garantía de 1 año</span>
          <span className="text-sm text-gray-500 mt-1">Contra defectos de fabricación</span>
        </div>
        <div className="flex items-center flex-col text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <FaRotate className="w-8 h-8 text-teal-600 mb-3" />
          <span className="font-medium text-gray-800">30 días para devolución</span>
          <span className="text-sm text-gray-500 mt-1">Si no estás satisfecho</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsAdicionales;
