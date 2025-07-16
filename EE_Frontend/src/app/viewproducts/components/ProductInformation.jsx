import RatingStars from './RatingStars';

const ProductInformation = ({ product, discountAmount, discountPercentage }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
      <div className="flex items-center mt-2">
        <RatingStars rating={product.rating} />
        <span className="text-sm text-gray-500 ml-2">
          {product.rating.toFixed(1)} ({product.reviewCount} valoraciones)
        </span>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-teal-600">
            S/ {(product.price - product.price * (parseInt(product.discount) / 100)).toFixed(2)}
          </span>
          {product.discount != 0 && (
            <span className="ml-3 line-through text-gray-500">S/ {product.price.toFixed(2)}</span>
          )}
        </div>
        {product.discount != 0 && (
          <div className="mt-1 inline-block bg-red-50 text-red-500 font-medium text-sm px-3 py-1 rounded-md">
            Ahorras S/ {(product.price * (parseInt(product.discount) / 100)).toFixed(2)} ({product.discount} de
            descuento)
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            product.stock > 10
              ? 'bg-green-50 text-green-600'
              : product.stock > 0
              ? 'bg-orange-50 text-orange-500'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {product.stock > 10 ? 'En stock' : product.stock > 0 ? `¡Solo quedan ${product.stock} unidades!` : 'Agotado'}
        </span>
      </div>
      <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
    </div>
  );
};

export default ProductInformation;
