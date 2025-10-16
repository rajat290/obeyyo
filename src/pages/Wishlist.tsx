import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/userCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/helpers';

const Wishlist: React.FC = () => {
  const { wishlist, loading, error, removeFromWishlist, getWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getWishlist();
    }
  }, [isAuthenticated]);

  const handleRemoveFromWishlist = async (productId: string): Promise<void> => {
    try {
      await removeFromWishlist(productId);
    } catch (err) {
      console.error('Failed to remove from wishlist:', err);
    }
  };

  const handleMoveToCart = async (productId: string): Promise<void> => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });
      await removeFromWishlist(productId);
      // Show success message (you can add toast notification here)
      alert('Product moved to cart successfully!');
    } catch (err) {
      console.error('Failed to move to cart:', err);
      alert('Failed to move product to cart. Please try again.');
    }
  };

  const handleAddToCart = async (productId: string): Promise<void> => {
    try {
      await addToCart({
        productId,
        quantity: 1,
      });
      // Show success message (you can add toast notification here)
      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your wishlist.</p>
          <button
            onClick={() => navigate('/login', { state: { from: '/wishlist' } })}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading && wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">😞</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={getWishlist}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">❤️</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Link
              to="/products"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {wishlist.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-start">
                  <Link 
                    to={`/product/${item.productId}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  <div className="ml-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.productId}`}
                          className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <p className="mt-2 text-lg font-bold text-gray-900">
                          {formatPrice(item.product.price)}
                        </p>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleRemoveFromWishlist(item.productId)}
                        className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove from wishlist"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => handleMoveToCart(item.productId)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                      >
                        Move to Cart
                      </button>
                      
                      <button
                        onClick={() => handleAddToCart(item.productId)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>

                    {!item.product.inStock && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link
            to="/products"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
          
          {wishlist.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                  wishlist.forEach(item => handleRemoveFromWishlist(item.productId));
                }
              }}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;