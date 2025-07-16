// components/viewProduct/ProductTabs.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductSpecifications from './ProductSpecifications';
import ProductDescription from './ProductDescription';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 font-medium relative ${
              activeTab === 'specs' ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('specs')}
          >
            Especificaciones
            {activeTab === 'specs' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
              />
            )}
          </button>
          <button
            className={`pb-4 font-medium relative ${
              activeTab === 'description' ? 'text-teal-600' : 'text-gray-500 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Descripción detallada
            {activeTab === 'description' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600"
              />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'specs' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ProductSpecifications product={product} />
        </motion.div>
      )}

      {activeTab === 'description' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ProductDescription product={product} />
        </motion.div>
      )}
    </div>
  );
};

export default ProductTabs;
