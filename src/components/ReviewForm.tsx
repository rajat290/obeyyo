import React, { useState } from 'react';
import { CreateReviewData, Review } from '../services/reviewService';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSubmit: (reviewData: CreateReviewData) => Promise<void>;
  onCancel?: () => void;
  editReview?: Review;
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  productName,
  onSubmit,
  onCancel,
  editReview,
  isSubmitting = false
}) => {
  const [rating, setRating] = useState<number>(editReview?.rating || 0);
  const [title, setTitle] = useState<string>(editReview?.title || '');
  const [comment, setComment] = useState<string>(editReview?.comment || '');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!title.trim()) {
      alert('Please enter a review title');
      return;
    }

    if (!comment.trim()) {
      alert('Please enter your review comment');
      return;
    }

    try {
      await onSubmit({
        productId,
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      // Reset form if not editing
      if (!editReview) {
        setRating(0);
        setTitle('');
        setComment('');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const getRatingText = (currentRating: number): string => {
    switch (currentRating) {
      case 1: return 'Terrible';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'Select Rating';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {editReview ? 'Edit Your Review' : 'Write a Review'}
      </h3>

      {!editReview && (
        <p className="text-sm text-gray-600 mb-4">
          Share your experience with {productName}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Rating Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 focus:outline-none"
              >
                <svg
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {getRatingText(hoverRating || rating)}
          </p>
        </div>

        {/* Review Title */}
        <div className="mb-4">
          <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
            Review Title *
          </label>
          <input
            type="text"
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience in a few words"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            maxLength={100}
          />
          <p className="mt-1 text-xs text-gray-500">
            {title.length}/100 characters
          </p>
        </div>

        {/* Review Comment */}
        <div className="mb-6">
          <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share details of your experience with this product..."
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-vertical"
            maxLength={1000}
          />
          <p className="mt-1 text-xs text-gray-500">
            {comment.length}/1000 characters
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || !title.trim() || !comment.trim()}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                {editReview ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              editReview ? 'Update Review' : 'Submit Review'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;