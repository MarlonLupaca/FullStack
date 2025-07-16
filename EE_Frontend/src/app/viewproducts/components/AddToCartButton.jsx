'use client';

import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { useProducts } from '@/app/context/ProductContext';
import { toast } from 'react-hot-toast';

const AddToCartButton = ({ product }) => {
  const { addProduct } = useProducts();

  const handleAddToCart = () => {
    addProduct(product);
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:flex-1 bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition flex items-center justify-center"
      onClick={handleAddToCart}
      disabled={product.stock <= 0}
    >
      <FaShoppingCart className="w-5 h-5 mr-2" />
      {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
    </motion.button>
  );
};

export default AddToCartButton;
