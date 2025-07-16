import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

const ProductRow = ({ product, handleEdit, handleDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 relative">
            <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
            {product.isNew && (
              <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-teal-600">
                N
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500 max-w-xs truncate">{product.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
          {product.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">S/ {product.price.toFixed(2)}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product.discount !== '0%' ? (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
            {product.discount}
          </span>
        ) : (
          <span className="text-xs text-gray-500">-</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm ${product.stock < 10 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm text-yellow-500">★</div>
          <div className="ml-1 text-sm text-gray-700">{product.rating}</div>
          <div className="ml-1 text-xs text-gray-500">({product.reviewCount})</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end gap-2">
          <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => handleEdit(product)}>
            <Edit size={16} className="text-blue-600" />
          </button>
          <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => handleDelete(product.id)}>
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
