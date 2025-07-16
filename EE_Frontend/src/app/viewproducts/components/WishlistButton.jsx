import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const WishlistButton = ({ isAdded, onToggleWishlist }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-3 border ${
        isAdded ? 'border-teal-600 text-teal-600 bg-teal-50' : 'border-gray-300 text-gray-500'
      } rounded-md hover:border-teal-600 hover:text-teal-600 transition-all`}
      onClick={onToggleWishlist}
    >
      <FaHeart className={`w-5 h-5 ${isAdded ? 'text-teal-600' : ''}`} />
    </motion.button>
  );
};

export default WishlistButton;
