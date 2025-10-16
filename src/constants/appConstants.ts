export const APP_CONSTANTS = {
  // App Info
  APP_NAME: 'Obeyyo',
  APP_VERSION: '1.0.0',
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Cart
  MAX_CART_QUANTITY: 10,
  SHIPPING_CHARGE: 50,
  FREE_SHIPPING_MIN_AMOUNT: 500,
  TAX_PERCENTAGE: 18,
  
  // Product
  DEFAULT_CURRENCY: '₹',
  
  // Order Status
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
  },
  
  // Payment Methods
  PAYMENT_METHODS: {
    COD: 'cod',
    CARD: 'card',
    UPI: 'upi',
    WALLET: 'wallet',
  },
};

export default APP_CONSTANTS;