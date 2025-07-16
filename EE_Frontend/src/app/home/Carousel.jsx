'use client';

import { useRef, useState, useEffect } from 'react';
import { FaAnglesRight, FaAnglesLeft } from 'react-icons/fa6';
import { useProducts } from '../context/ProductContext';
import Link from 'next/link';
import API_BASE_URL from '../config/apiConfig';
import { toast } from 'react-hot-toast';

const Carousel = () => {
  const { addProduct } = useProducts();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const last6Products = data.sort((a, b) => b.id - a.id).slice(0, 6);
        setProducts([...last6Products].reverse());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth / 1.2;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        {hasHalfStar && <span>½</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i + fullStars + (hasHalfStar ? 1 : 0)} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error.message}</div>;

  return (
    <div className="w-full flex px-10 py-6 justify-center items-center">
      <div className="flex justify-center items-center">
        <button
          onClick={() => scroll('left')}
          className="z-10 bg-white text-primary cursor-pointer p-2 rounded-full w-10 h-10 hover:bg-gray-100 shadow-md flex justify-center items-center"
          aria-label="Desplazar a la izquierda"
        >
          <FaAnglesLeft />
        </button>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-hidden scroll-smooth no-scrollbar mx-5 py-2">
        {products.map((product) => (
          <div
            key={product.code}
            className="w-[250px] h-[350px] flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
          >
            <div className="relative h-40 bg-gray-100">
              <img
                src={`${API_BASE_URL}${product.imageUrl}`}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
              />
              {product.discount != 0 && (
                <div className="absolute top-2 right-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">
                  -{product.discount}
                </div>
              )}
            </div>

            <div className="p-4">
              <Link href={`/viewproducts/${product.code}`}>
                <p className="font-semibold text-[16px] text-primary transition-all duration-500 hover:text-secondary truncate">
                  {product.name}
                </p>
              </Link>

              <div className="mt-1">
                <RatingStars rating={product.rating} />
              </div>

              <div className="mt-2 flex items-baseline">
                <span className="text-[18px] font-[600] text-gray-900">
                  S/. {(product.price - product.price * (parseInt(product.discount) / 100)).toFixed(2)}
                </span>
                {product.discount != 0 && (
                  <span className="ml-2 text-[13px] text-gray-500 line-through">S/. {product.price.toFixed(2)}</span>
                )}
              </div>

              <button
                className="mt-4 w-full cursor-pointer bg-primary text-white text-[15px] py-2 rounded-md hover:bg-secondary transition-colors font-[700]"
                onClick={() => {
                  addProduct({ ...product, quantity: 1 });
                  toast.success(`${product.name} añadido al carrito`);
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => scroll('right')}
          className="z-10 bg-white text-primary cursor-pointer p-2 rounded-full w-10 h-10 hover:bg-gray-100 shadow-md flex justify-center items-center"
          aria-label="Desplazar a la derecha"
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
