import QuantityCounter from './QuantityCounter';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';

const ProductDetails = ({
  handleAddToCart,
  product,
  quantity,
  onQuantityIncrement,
  onQuantityDecrement,
  onAddToCart,
  wishlistAdded,
  onToggleWishlist,
}) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <QuantityCounter
          quantity={quantity}
          onIncrement={onQuantityIncrement}
          onDecrement={onQuantityDecrement}
          stock={product.stock}
        />
        <AddToCartButton product={product} />

        <WishlistButton isAdded={wishlistAdded} onToggleWishlist={onToggleWishlist} />
      </div>
    </div>
  );
};

export default ProductDetails;
