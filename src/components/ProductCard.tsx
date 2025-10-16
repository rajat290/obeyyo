import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/userCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, checkInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  useEffect(() => {
    // Check if product is in wishlist
    setIsInWishlist(checkInWishlist(product.id));
  }, [product.id, checkInWishlist]);

  const handleAddToCart = async (): Promise<void> => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product.id,
        quantity: 1,
        size: product.sizes[0],
        color: product.colors[0],
      });
      // Success feedback can be added here (toast notification)
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = async (): Promise<void> => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    try {
      setWishlistLoading(true);
      
      if (isInWishlist) {
        await removeFromWishlist(product.id);
        setIsInWishlist(false);
      } else {
        await addToWishlist(product.id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group relative">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        disabled={wishlistLoading}
        className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {wishlistLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
        ) : (
          <svg
            className={`h-5 w-5 ${
              isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
            fill={isInWishlist ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 bg-gray-200 relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="absolute top-2 left-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Trending
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="absolute bottom-2 left-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {calculateDiscount(product.originalPrice, product.price)}% OFF
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">
              ({product.reviewCount})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={addingToCart || !product.inStock}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {addingToCart ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : !product.inStock ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>

        {showLoginPrompt && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Please{' '}
              <Link to="/login" className="font-medium text-yellow-900 hover:text-yellow-700 underline">
                sign in
              </Link>{' '}
              to add items to cart
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;