import RatingStars from './RatingStars';

const ProductInformation = ({ product, discountAmount, discountPercentage }) => {
  if (!product) return null;

  const name = product.name || '';
  const rating = typeof product.rating === 'number' ? product.rating : 0;
  const reviewCount = product.reviewCount || 0;
  const price = typeof product.price === 'number' ? product.price : 0;
  const discount = parseInt(product.discount) || 0;
  const stock = typeof product.stock === 'number' ? product.stock : 0;
  const description = product.description || '';

  const finalPrice = price - price * (discount / 100);
  const discountValue = price * (discount / 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
      <div className="flex items-center mt-2">
        <RatingStars rating={rating} />
        <span className="text-sm text-gray-500 ml-2">
          {rating.toFixed(1)} ({reviewCount} valoraciones)
        </span>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-teal-600">S/ {finalPrice.toFixed(2)}</span>
          {discount !== 0 && <span className="ml-3 line-through text-gray-500">S/ {price.toFixed(2)}</span>}
        </div>
        {discount !== 0 && (
          <div className="mt-1 inline-block bg-red-50 text-red-500 font-medium text-sm px-3 py-1 rounded-md">
            Ahorras S/ {discountValue.toFixed(2)} ({discount}% de descuento)
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            stock > 10
              ? 'bg-green-50 text-green-600'
              : stock > 0
              ? 'bg-orange-50 text-orange-500'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {stock > 10 ? 'En stock' : stock > 0 ? `¡Solo quedan ${stock} unidades!` : 'Agotado'}
        </span>
      </div>
      <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default ProductInformation;
