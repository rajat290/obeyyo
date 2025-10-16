import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import reviewService, { Review } from '../services/reviewService';
import ReviewCard from '../components/ReviewCard';
import { formatDate } from '../utils/helpers';

const UserReviews: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReview, setDeletingReview] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserReviews();
    }
  }, [isAuthenticated]);

  const loadUserReviews = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const response = await reviewService.getUserReviews();
      setReviews(response.data?.reviews || []);
    } catch (err: any) {
      setError('Failed to load your reviews. Please try again.');
      console.error('User reviews loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review: Review): void => {
    setEditingReview(review);
    // You can implement edit functionality here
    console.log('Edit review:', review);
  };

  const handleDeleteReview = async (reviewId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingReview(reviewId);
      await reviewService.deleteReview(reviewId);
      
      // Remove from local state
      setReviews(reviews.filter(review => review.id !== reviewId));
      
      alert('Review deleted successfully!');
    } catch (err: any) {
      alert('Failed to delete review. Please try again.');
      console.error('Review deletion error:', err);
    } finally {
      setDeletingReview(null);
    }
  };

  const handleHelpfulReview = async (reviewId: string): Promise<void> => {
    try {
      await reviewService.markHelpful(reviewId);
      // Reload reviews to get updated helpful count
      await loadUserReviews();
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your reviews.</p>
          <button
            onClick={() => navigate('/login', { state: { from: '/reviews' } })}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading && reviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your reviews...</p>
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
            onClick={loadUserReviews}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Reviews</h1>
          <p className="mt-2 text-gray-600">
            Manage and view all your product reviews
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't written any reviews yet. Share your experiences with products you've purchased!
            </p>
            <Link
              to="/products"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Product Info */}
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex items-center">
                    <img
                      src={'/placeholder-product.jpg'}
                      alt={`Product ${review.productId}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <Link
                        to={`/product/${review.productId}`}
                        className="text-lg font-medium text-gray-900 hover:text-indigo-600"
                      >
                        {`Product ${review.productId}`}
                      </Link>
                      <p className="text-sm text-gray-600">
                        Reviewed on {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6">
                  <ReviewCard
                    review={review}
                    onHelpful={handleHelpfulReview}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                    isOwner={true}
                  />
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {review.verified && (
                        <span className="inline-flex items-center text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                      >
                        Edit Review
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={deletingReview === review.id}
                        className="text-red-600 hover:text-red-500 text-sm font-medium disabled:opacity-50"
                      >
                        {deletingReview === review.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Summary */}
        {reviews.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length * 10) / 10}
                </p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.reduce((sum, review) => sum + review.helpful, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Helpful Votes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviews;