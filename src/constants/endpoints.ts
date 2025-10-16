export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  
  // User Management
  USER: {
    PROFILE: '/users/profile',
    ADDRESSES: '/users/addresses',
    UPDATE_PROFILE: '/users/profile',
  },
  
  // Products
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: '/products',
    FEATURED: '/products/featured',
    TRENDING: '/products/trending',
    NEW_ARRIVALS: '/products/new-arrivals',
    RELATED: '/products/related',
    SEARCH: '/products/search',
  },
  
  // Categories
  CATEGORIES: {
    GET_ALL: '/categories',
  },
  
  // Cart
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: '/cart/items',
    REMOVE_ITEM: '/cart/items',
    CLEAR: '/cart',
  },
  
  // Orders
  ORDERS: {
    CREATE: '/orders',
    GET_ALL: '/orders',
    GET_BY_ID: '/orders',
    CANCEL: '/orders',
  },
  
  // Wishlist
  WISHLIST: {
    GET: '/wishlist',
    ADD: '/wishlist',
    REMOVE: '/wishlist',
  },
  
  // Reviews
  REVIEWS: {
    GET_PRODUCT_REVIEWS: '/reviews/product',
    CREATE: '/reviews',
  },
  
  // Coupons
  COUPONS: {
    VALIDATE: '/coupons/validate',
  },
  
  // Banners
  BANNERS: {
    GET_HERO: '/public/banners',
  },
};

export default API_ENDPOINTS;