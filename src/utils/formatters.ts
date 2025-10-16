// Format product data from API to frontend structure
export const formatProduct = (apiProduct) => {
  return {
    id: apiProduct.id || apiProduct._id,
    name: apiProduct.name,
    price: apiProduct.price,
    originalPrice: apiProduct.originalPrice || apiProduct.price,
    description: apiProduct.description,
    images: apiProduct.images || [apiProduct.image],
    category: apiProduct.category,
    brand: apiProduct.brand,
    rating: apiProduct.rating || 0,
    reviewCount: apiProduct.reviews || apiProduct.reviewCount || 0,
    inStock: apiProduct.inStock !== false,
    sizes: apiProduct.sizes || ['S', 'M', 'L', 'XL'],
    colors: apiProduct.colors || ['Black', 'White', 'Blue'],
    isNew: apiProduct.isNew || false,
    isTrending: apiProduct.isTrending || false,
    slug: apiProduct.slug || apiProduct.name.toLowerCase().replace(/ /g, '-'),
  };
};

// Format cart data
export const formatCart = (apiCart) => {
  return {
    items: apiCart.items?.map(item => ({
      id: item.id || item._id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      size: item.size,
      color: item.color,
    })) || [],
    totalItems: apiCart.totalItems || 0,
    subtotal: apiCart.subtotal || 0,
    tax: apiCart.tax || 0,
    shipping: apiCart.shipping || 0,
    total: apiCart.total || 0,
  };
};

// Format order data
export const formatOrder = (apiOrder) => {
  return {
    id: apiOrder.id || apiOrder._id,
    orderNumber: apiOrder.orderNumber,
    status: apiOrder.status,
    totalAmount: apiOrder.totalAmount,
    createdAt: apiOrder.createdAt,
    items: apiOrder.items?.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })) || [],
    shippingAddress: apiOrder.shippingAddress,
    paymentMethod: apiOrder.paymentMethod,
  };
};