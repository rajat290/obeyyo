import React from 'react';
import { ReviewStats as ReviewStatsType } from '../services/reviewService';

interface ReviewStatsProps {
  stats: ReviewStatsType;
  onRatingFilter?: (rating: number) => void;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ stats, onRatingFilter }) => {
  const getPercentage = (count: number): number => {
    if (stats.totalReviews === 0) return 0;
    return (count / stats.totalReviews) * 100;
  };

  const getStarLabel = (rating: number): string => {
    switch (rating) {
      case 5: return 'Excellent';
      case 4: return 'Good';
      case 3: return 'Average';
      case 2: return 'Poor';
      case 1: return 'Terrible';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
      
      {/* Overall Rating */}
      <div className="flex items-center mb-6">
        <div className="text-4xl font-bold text-gray-900 mr-4">
          {stats.averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.floor(stats.averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Based on {stats.totalReviews} {stats.totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution];
          const percentage = getPercentage(count);
          
          return (
            <button
              key={rating}
              onClick={() => onRatingFilter?.(rating)}
              className="flex items-center w-full text-left hover:bg-gray-50 p-1 rounded-md transition-colors"
            >
              <div className="flex items-center w-16">
                <span className="text-sm font-medium text-gray-900 w-4">{rating}</span>
                <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <div className="flex-1 mx-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="w-12 text-right">
                <span className="text-sm text-gray-600">{count}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Rating Labels */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>5 ★ - Excellent</div>
          <div>4 ★ - Good</div>
          <div>3 ★ - Average</div>
          <div>2 ★ - Poor</div>
          <div>1 ★ - Terrible</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;