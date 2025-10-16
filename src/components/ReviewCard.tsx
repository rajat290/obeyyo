import React, { useState } from 'react';
import { Review } from '../services/reviewService';
import { formatDate } from '../utils/helpers';

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
  isOwner?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  onHelpful, 
  onEdit, 
  onDelete, 
  isOwner = false 
}) => {
  const [helpfulClicked, setHelpfulClicked] = useState<boolean>(false);

  const handleHelpful = (): void => {
    if (!helpfulClicked) {
      onHelpful?.(review.id);
      setHelpfulClicked(true);
    }
  };

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            {review.user.avatar ? (
              <img
                src={review.user.avatar}
                alt={`${review.user.firstName} ${review.user.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-indigo-600 font-medium text-sm">
                {getInitials(review.user.firstName, review.user.lastName)}
              </span>
            )}
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">
              {review.user.firstName} {review.user.lastName}
            </h4>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Badge */}
        {review.verified && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verified Purchase
          </span>
        )}
      </div>

      {/* Review Title & Comment */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {review.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleHelpful}
            disabled={helpfulClicked}
            className={`flex items-center text-sm ${
              helpfulClicked 
                ? 'text-green-600 font-medium' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg 
              className={`w-4 h-4 mr-1 ${
                helpfulClicked ? 'text-green-600' : 'text-gray-400'
              }`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Helpful ({review.helpful})
          </button>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit?.(review)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(review.id)}
              className="text-sm text-red-600 hover:text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;