import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/userCart';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';
import productService from '../services/productService';
import reviewService, { Review, ReviewStats, CreateReviewData } from '../services/reviewService';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/helpers';
import ReviewStatsComponent from '../components/ReviewStats';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, checkInWishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [activeReviewTab, setActiveReviewTab] = useState<'reviews' | 'write'>('reviews');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      loadProductData();
      loadReviews();
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
        setSelectedSize(prod.sizes?.[0] || '');
        setSelectedColor(prod.colors?.[0] || '');
        setIsInWishlist(checkInWishlist(prod.id));
      }

    } catch (err: any) {
      setError('Product not found or failed to load.');
      console.error('Product detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async (): Promise<void> => {
    if (!id) return;

    try {
      const response = await reviewService.getProductReviews(id);
      setReviews(response.data?.reviews || []);
      setReviewStats(response.data?.stats || null);
    } catch (err: any) {
      console.error('Failed to load reviews:', err);
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

  const handleSubmitReview = async (reviewData: CreateReviewData): Promise<void> => {
    try {
      setReviewLoading(true);
      await reviewService.createReview(reviewData);

      // Reload reviews
      await loadReviews();

      // Switch back to reviews tab
      setActiveReviewTab('reviews');
      setShowReviewForm(false);

      alert('Review submitted successfully!');
    } catch (error: any) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleHelpfulReview = async (reviewId: string): Promise<void> => {
    try {
      await reviewService.markHelpful(reviewId);
      // Reload reviews to get updated helpful count
      await loadReviews();
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-indigo-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to={`/category/${product.category}`} className="hover:text-indigo-600 capitalize">
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="w-full">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-indigo-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            {/* Rating and reviews */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(product.rating || 0)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center">
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-lg text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {calculateDiscount(product.originalPrice, product.price)}% OFF
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none ${
                        selectedSize === size
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                </div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium hover:bg-gray-50 focus:outline-none ${
                        selectedColor === color
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              </div>
              <div className="flex items-center mt-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="mx-4 text-gray-700">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart and Buy now buttons */}
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
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            {/* Review Stats */}
            <div className="lg:col-span-4">
              {reviewStats && (
                <ReviewStatsComponent
                  stats={reviewStats}
                  onRatingFilter={(rating) => {
                    // Implement rating filter if needed
                    console.log('Filter by rating:', rating);
                  }}
                />
              )}

              {/* Write Review Button */}
              {isAuthenticated && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setActiveReviewTab('write');
                      setShowReviewForm(true);
                    }}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium"
                  >
                    Write a Review
                  </button>
                </div>
              )}
            </div>

            {/* Reviews Content */}
            <div className="mt-16 lg:mt-0 lg:col-span-8">
              {/* Review Tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveReviewTab('reviews')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeReviewTab === 'reviews'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Customer Reviews
                    {reviewStats && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                        {reviewStats.totalReviews}
                      </span>
                    )}
                  </button>

                  {isAuthenticated && (
                    <button
                      onClick={() => setActiveReviewTab('write')}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeReviewTab === 'write'
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Write a Review
                    </button>
                  )}
                </nav>
              </div>

              {/* Reviews Content */}
              <div className="mt-8">
                {activeReviewTab === 'reviews' ? (
                  <>
                    {/* Reviews Sorting */}
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        Customer Reviews
                      </h3>
                      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                        <option value="newest">Newest First</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="highest">Highest Rated</option>
                        <option value="lowest">Lowest Rated</option>
                      </select>
                    </div>

                    {/* Reviews List */}
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <ReviewCard
                            key={review.id}
                            review={review}
                            onHelpful={handleHelpfulReview}
                            isOwner={user?.id === review.user.id}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">💬</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No reviews yet
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Be the first to share your thoughts about this product!
                        </p>
                        {isAuthenticated && (
                          <button
                            onClick={() => {
                              setActiveReviewTab('write');
                              setShowReviewForm(true);
                            }}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium"
                          >
                            Write First Review
                          </button>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  /* Write Review Form */
                  <ReviewForm
                    productId={id!}
                    productName={product?.name || ''}
                    onSubmit={handleSubmitReview}
                    onCancel={() => setActiveReviewTab('reviews')}
                    isSubmitting={reviewLoading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={relatedProduct.images?.[0] || '/placeholder.svg'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700 group-hover:text-gray-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatPrice(relatedProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
