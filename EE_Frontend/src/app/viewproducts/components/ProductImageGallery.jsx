import { motion } from 'framer-motion';
import API_BASE_URL from '@/app/config/apiConfig';

const ProductImageGallery = ({ product, selectedImage }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm mb-1 relative overflow-hidden group">
      {product.isNew && (
        <span className="absolute w-auto text-center top-4 left-4 bg-teal-600 text-white px-3 py-1 text-xs font-bold rounded-md z-10">
          NUEVO
        </span>
      )}
      {product.discount != 0 && (
        <span className="absolute top-4 right-4 w-auto text-center bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-md z-10">
          -{product.discount}
        </span>
      )}
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        src={`${API_BASE_URL}${product.imageUrl}`}
        alt={product.name}
        className="w-full rounded-lg object-cover"
      />
      {console.log(`${API_BASE_URL}${product.imageUrl}`)}
    </div>
  );
};

export default ProductImageGallery;
