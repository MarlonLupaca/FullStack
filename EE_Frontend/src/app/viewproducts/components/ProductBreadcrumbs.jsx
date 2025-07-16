import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

const ProductBreadcrumbs = ({ category, name }) => {
  return (
    <div className="container mx-auto py-4 px-4 lg:px-0">
      <div className="flex text-sm text-gray-500 items-center">
        <Link
          href="/products"
          className="border bg-primary text-white py-2 px-3 rounded-lg mr-3 hover:bg-teal-700 transition-colors"
        >
          <FaArrowLeftLong />
        </Link>
        <p className="hover:text-teal-600 transition-colors cursor-pointer">{category}</p>
        <span className="mx-2">/</span>
        <span className="text-teal-600 font-medium">{name}</span>
      </div>
    </div>
  );
};

export default ProductBreadcrumbs;
