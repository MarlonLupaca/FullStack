import { motion } from 'framer-motion';

const QuantityCounter = ({ quantity, onIncrement, onDecrement, stock }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md w-full sm:w-auto">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="px-4 py-2 text-gray-600 hover:text-teal-600 disabled:text-gray-300 transition-colors"
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        -
      </motion.button>
      <span className="w-16 text-center font-medium">{quantity}</span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="px-4 py-2 text-gray-600 hover:text-teal-600 disabled:text-gray-300 transition-colors"
        onClick={onIncrement}
        disabled={quantity >= stock}
      >
        +
      </motion.button>
    </div>
  );
};

export default QuantityCounter;
