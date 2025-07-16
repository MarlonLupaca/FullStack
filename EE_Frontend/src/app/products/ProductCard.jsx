'use client';

import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/app/context/ProductContext';
import { toast } from 'react-hot-toast';
import API_BASE_URL from '../config/apiConfig';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { addProduct } = useProducts();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const discount = parseInt(product.discount) / 100 || 0;
  const discountedPrice = (product.price - product.price * discount).toFixed(2);

  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} fill="#F59E0B" stroke="#F59E0B" />
        ))}
        {hasHalfStar && <Star key="half" size={16} fill="url(#halfStar)" stroke="#F59E0B" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={i + fullStars + (hasHalfStar ? 1 : 0)} size={16} stroke="#D1D5DB" />
        ))}

        <svg width="0" height="0">
          <defs>
            <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  const handleAddToCart = () => {
    addProduct({ ...product, quantity: 1 });
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <div className="w-full max-w-sm h-[585px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl">
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        <img
          src={`${API_BASE_URL}${product.imageUrl}`}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        {product.discount != 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            -{product.discount}
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            Nuevo
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col justify-between h-[330px]">
        <div>
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">{product.category}</div>

          <Link
            href={`/viewproducts/${product.code}`}
            className="font-bold text-lg text-gray-800 mb-2 hover:text-primary transition-colors"
          >
            {product.name}
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center mb-3">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount} reseñas)</span>
          </div>

          <div className="flex items-baseline mb-4">
            <span className="text-xl font-bold text-gray-900">S/. {discountedPrice}</span>
            {product.discount != 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">S/. {product.price}</span>
            )}
          </div>

          {product.stock > 0 ? (
            <div className="text-xs text-green-600 mb-3">✓ En stock ({product.stock} disponibles)</div>
          ) : (
            <div className="text-xs text-red-600 mb-3">✗ Agotado</div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            className="cursor-pointer flex-1 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-md transition-colors"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            onClick={toggleFavorite}
          >
            <Heart size={20} fill={isFavorite ? '#EF4444' : 'none'} stroke={isFavorite ? '#EF4444' : 'currentColor'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
