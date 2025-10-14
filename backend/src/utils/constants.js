// Order statuses
const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
};

// Payment statuses
const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Payment methods
const PAYMENT_METHODS = {
  COD: 'cod',
  ONLINE: 'online',
  UPI: 'upi',
  CARD: 'card',
  WALLET: 'wallet',
};

// User roles
const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
};

// Address types
const ADDRESS_TYPES = {
  HOME: 'home',
  WORK: 'work',
  OTHER: 'other',
};

// Banner positions
const BANNER_POSITIONS = {
  HERO: 'hero',
  SECTION: 'section',
  SIDEBAR: 'sidebar',
};

// Banner link types
const BANNER_LINK_TYPES = {
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  URL: 'url',
};

// Coupon types
const COUPON_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
};

// Notification types
const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PROMOTION: 'promotion',
  SYSTEM: 'system',
};

module.exports = {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  USER_ROLES,
  ADDRESS_TYPES,
  BANNER_POSITIONS,
  BANNER_LINK_TYPES,
  COUPON_TYPES,
  NOTIFICATION_TYPES,
};
