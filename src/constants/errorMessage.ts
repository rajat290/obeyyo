export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',

  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password.',
  UNAUTHORIZED: 'Please login to continue.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',

  // Validation errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  WEAK_PASSWORD: 'Password must be at least 6 characters long.',

  // Product errors
  PRODUCT_NOT_FOUND: 'Product not found.',
  OUT_OF_STOCK: 'Product is out of stock.',

  // Cart errors
  CART_EMPTY: 'Your cart is empty.',
  INVALID_COUPON: 'Invalid coupon code.',

  // Order errors
  ORDER_FAILED: 'Order creation failed. Please try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',

  // Generic
  SOMETHING_WRONG: 'Something went wrong. Please try again.',
  TRY_AGAIN: 'Please try again.',
};

export default ERROR_MESSAGES;