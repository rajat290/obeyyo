import API from '../lib/api';
import { API_ENDPOINTS } from '../constants/endpoints';
import { getErrorMessage } from '../utils/helpers';
import { ApiResponse } from '../types';

export interface Review {
  id: string;
  userId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  productId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  verified: boolean;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  title: string;
  comment: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  stats: ReviewStats;
}

export interface ReviewResponse {
  review: Review;
}

export const reviewService = {
  // Get product reviews
  getProductReviews: async (productId: string, page: number = 1, limit: number = 10): Promise<ApiResponse<ReviewsResponse>> => {
    try {
      const response = await API.get<ApiResponse<ReviewsResponse>>(
        `${API_ENDPOINTS.REVIEWS.GET_PRODUCT_REVIEWS}/${productId}`,
        { params: { page, limit } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Create review
  createReview: async (reviewData: CreateReviewData): Promise<ApiResponse<ReviewResponse>> => {
    try {
      const response = await API.post<ApiResponse<ReviewResponse>>(
        API_ENDPOINTS.REVIEWS.CREATE,
        reviewData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Update review
  updateReview: async (reviewId: string, reviewData: Partial<CreateReviewData>): Promise<ApiResponse<ReviewResponse>> => {
    try {
      const response = await API.put<ApiResponse<ReviewResponse>>(
        `${API_ENDPOINTS.REVIEWS.CREATE}/${reviewId}`,
        reviewData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Delete review
  deleteReview: async (reviewId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.delete<ApiResponse<{ message: string }>>(
        `${API_ENDPOINTS.REVIEWS.CREATE}/${reviewId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Mark review as helpful
  markHelpful: async (reviewId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await API.post<ApiResponse<{ message: string }>>(
        `${API_ENDPOINTS.REVIEWS.CREATE}/${reviewId}/helpful`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },

  // Get user reviews
  getUserReviews: async (page: number = 1, limit: number = 10): Promise<ApiResponse<ReviewsResponse>> => {
    try {
      const response = await API.get<ApiResponse<ReviewsResponse>>(
        `${API_ENDPOINTS.REVIEWS.CREATE}/user`,
        { params: { page, limit } }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default reviewService;