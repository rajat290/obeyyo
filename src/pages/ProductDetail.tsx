import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/userCart';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import productService from '../services/productService';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/helpers';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);


const { addToWishlist, removeFromWishlist, checkInWishlist } = useWishlist();

  useEffect(() => {
    if (id) {
      loadProductData();
    }
  }, [id]);

  const loadProductData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');

      const [productResponse, relatedResponse] = await Promise.all([
        productService.getProductById(id!),
        productService.getRelatedProducts(id!, 4)
      ]);

      setProduct(productResponse.data?.product || null);
      setRelatedProducts(relatedResponse.data?.products || []);

      // Set default selections
      if (productResponse.data?.product) {
        const prod = productResponse.data.product;
        setSelectedSize(prod.sizes[0] || '');
        setSelectedColor(prod.colors[0] || '');
      }

    } catch (err: any) {
      setError('Product not found or failed to load.');
      console.error('Product detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (): Promise<void> => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    if (!product) return;

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      });
      // Show success message (you can add toast notification here)
      alert('Product added to cart successfully!');
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async (): Promise<void> => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    if (!product) return;

    try {
      setAddingToCart(true);
      await addToCart({
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      });
      // Redirect to cart page
      navigate('/cart');
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };
useEffect(() => {
  if (product) {
    setIsInWishlist(checkInWishlist(product.id));
  }
}, [product, checkInWishlist]);

const handleWishlistToggle = async (): Promise<void> => {
  if (!isAuthenticated) {
    navigate('/login', { state: { from: `/product/${id}` } });
    return;
  }

  if (!product) return;

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


  // Update the buttons section in the form:
  return (
    <div className="mt-10 flex space-x-4">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={addingToCart || !product?.inStock}
        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed sm:w-full"
      >
        {addingToCart ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Adding...
          </>
        ) : !product?.inStock ? (
          'Out of Stock'
        ) : (
          'Add to Cart'
        )}
      </button>

      <button
        type="button"
        onClick={handleBuyNow}
        disabled={addingToCart || !product?.inStock}
        className="max-w-xs flex-1 bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed sm:w-full"
      >
        Buy Now
      </button>
 <button
    type="button"
    onClick={handleWishlistToggle}
    disabled={wishlistLoading}
    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
  >
    {wishlistLoading ? (
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
    ) : (
      <svg
        className={`h-6 w-6 ${
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
    <span className="sr-only">
      {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    </span>
  </button>

    </div>
  );
}

export default ProductDetail;