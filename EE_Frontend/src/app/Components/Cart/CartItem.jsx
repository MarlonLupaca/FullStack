'use client';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import API_BASE_URL from '@/app/config/apiConfig';

export default function CartItem({ item }) {
  const { updateProductQuantity, removeProduct } = useProducts();

  const handleIncrease = () => {
    updateProductQuantity(item.code, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeProduct(item.code);
    } else {
      updateProductQuantity(item.code, item.quantity - 1);
    }
  };

  return (
    <li className="bg-white rounded-lg shadow-sm p-3 flex">
      <div className="h-20 w-20 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="text-xs font-medium text-primary">{item.category}</span>
          <button onClick={() => removeProduct(item.code)} className="text-gray-400 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <h3 className="font-medium text-sm mb-1">{item.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={handleDecrease} className="text-gray-500 hover:text-primary" disabled={item.quantity <= 1}>
              <Minus className="h-4 w-4" />
            </button>
            <span className="mx-2 text-sm font-medium">{item.quantity}</span>
            <button onClick={handleIncrease} className="text-gray-500 hover:text-primary">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">
              S/. {((item.price - (item.price * parseInt(item.discount || 0)) / 100) * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
