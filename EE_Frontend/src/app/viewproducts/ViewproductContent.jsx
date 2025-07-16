'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductBreadcrumbs from './components/ProductBreadcrumbs';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInformation from './components/ProductInformation';
import ProductTabs from './components/ProductTabs';
import ProductDetails from './components/ProductDetails';
import ProductDetailsAdicionales from './components/ProductDetailsAdicionales';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import ProductNotFound from './components/ProductNotFound';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import ProductHighlights from './components/ProductHighlights';
import { useProducts } from '../context/ProductContext';
import AddToCartButton from './components/AddToCartButton';
import API_BASE_URL from '../config/apiConfig';

const ViewproductContent = ({ code }) => {
  const [productfind, setProductfind] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const [loadingReviewsData, setLoadingReviewsData] = useState(true);
  const [errorReviewsData, setErrorReviewsData] = useState(null);
  const { addProduct, updateProductQuantity, products: cartProducts } = useProducts();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${code}`);
      setProductfind(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchReviewsData = async () => {
    setLoadingReviewsData(true);
    setErrorReviewsData(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/reviews/product/${code}`);
      setReviewsData(response.data);
    } catch (error) {
      setErrorReviewsData('Error al cargar las reseñas.');
      console.error('Error fetching reviews:', error);
    } finally {
      setLoadingReviewsData(false);
    }
  };

  useEffect(() => {
    if (code) {
      fetchProduct();
      fetchReviewsData();
    } else {
      setError('No se proporcionó un code de producto.');
      setLoading(false);
      setLoadingReviewsData(false);
    }
  }, [code]);

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleCommentSubmitSuccess = () => {
    fetchReviewsData();
  };

  const handleCommentSubmitError = (errorMessage) => {
    alert(`Error al enviar el comentario: ${errorMessage}`);
  };

  const handleAddToCart = () => {
    console.log('entro');
    if (productfind) {
      const existingProductInCart = cartProducts.find((item) => item.code === productfind.code);

      if (existingProductInCart) {
        updateProductQuantity(existingProductInCart.code, (existingProductInCart.quantity || 0) + 1);
      } else {
        addProduct({ ...productfind, quantity: 1 });
      }
      setAddedToCart(true);
    }
  };

  const handleWishlist = () => {
    setWishlistAdded(!wishlistAdded);
  };

  const handleQuantityIncrement = () => {
    setQuantity(Math.min(productfind?.stock || 1, quantity + 1));
  };

  const handleQuantityDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  if (loading) {
    return <div>Cargando información del producto...</div>;
  }

  if (error) {
    return <ProductNotFound message={`Error al cargar el producto: ${error}`} />;
  }

  if (!productfind) {
    return <ProductNotFound />;
  }

  const discountAmount = productfind.priceBeforeDiscount - productfind.price;
  const discountPercentage = Math.round((discountAmount / productfind.priceBeforeDiscount) * 100);

  return (
    <div className="bg-tertiary min-h-screen px-20 ">
      <ProductBreadcrumbs category={productfind.category} name={productfind.name} />

      {addedToCart && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-md shadow-md flex items-center"
        >
          <FaCheck className="mr-2" />
          <span>Producto añadido al carrito</span>
        </motion.div>
      )}

      <div className="container mx-auto py-6 px-4 pt-0 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="lg:w-1/2 ">
            <ProductInformation
              product={productfind}
              discountAmount={discountAmount}
              discountPercentage={discountPercentage}
            />
            <ProductHighlights highlights={productfind.highlights} />
            <ProductDetails
              product={productfind}
              quantity={quantity}
              onQuantityIncrement={handleQuantityIncrement}
              onQuantityDecrement={handleQuantityDecrement}
              wishlistAdded={wishlistAdded}
              onToggleWishlist={handleWishlist}
            />
            <ProductTabs product={productfind} />
            <ProductDetailsAdicionales />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <ProductImageGallery product={productfind} />
            <div className="container mx-auto py-8 px-6 lg:px-0 ">
              <div className="bg-white rounded-xl shadow-sm p-6 py-8">
                <p className="text-2xl font-bold text-gray-800 mb-6 px-4">Valoraciones y comentarios</p>
                <CommentList
                  productCode={code}
                  reviews={reviewsData}
                  loading={loadingReviewsData}
                  error={errorReviewsData}
                />
                <CommentForm
                  productCode={code}
                  onSubmitSuccess={handleCommentSubmitSuccess}
                  onSubmitError={handleCommentSubmitError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewproductContent;
