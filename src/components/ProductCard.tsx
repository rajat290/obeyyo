import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  brand: string;
  isNew?: boolean;
  isTrending?: boolean;
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact = false }: ProductCardProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsInCart(true);
    setIsAddingToCart(false);
    
    // Trigger custom event for count update
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToWishlist(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.success("Removed from wishlist");
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast.success("Added to wishlist!");
    }
    
    setIsAddingToWishlist(false);
    
    // Trigger custom event for count update
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="relative aspect-[3/4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-obeyyo-red text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="absolute top-2 left-2 bg-obeyyo-orange text-white text-xs px-2 py-1 rounded-full">
              Trending
            </span>
          )}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-3 h-3 ${isInWishlist ? 'fill-obeyyo-red text-obeyyo-red' : 'text-gray-600'}`} />
          </button>
        </div>
        
        <div className="p-2">
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-medium text-sm text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          
          <div className="flex items-center mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-obeyyo-yellow text-obeyyo-yellow' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-1">₹{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-obeyyo-blue text-white px-2 py-1 rounded text-xs hover:bg-obeyyo-blue/90 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div 
        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 ${isHovered ? 'scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-row flex-wrap gap-x-1 gap-y-1 max-w-[80%] z-10">
            {product.isNew && (
              <Badge className="bg-green-500 text-white text-xs px-2 py-1 transition-opacity duration-500 opacity-90">
                NEW
              </Badge>
            )}
            {product.isTrending && (
              <Badge className="bg-orange-500 text-white text-xs px-2 py-1 transition-opacity duration-500 opacity-90">
                🔥 TRENDING
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1 transition-opacity duration-500 opacity-90">
                -{discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${isAddingToWishlist ? 'animate-spin' : ''}`}
            onClick={handleToggleWishlist}
            disabled={isAddingToWishlist}
          >
            <Heart 
              className={`w-4 h-4 transition-all duration-200 ${
                isInWishlist ? 'fill-red-500 text-red-500 animate-pulse' : 'text-gray-600'
              }`} 
            />
          </Button>

          {/* Quick Add to Cart */}
          <div className={`absolute bottom-2 left-2 right-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart || isInCart}
              className={`w-full bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white rounded-lg py-2 text-sm font-medium transition-all duration-300 hover:shadow-lg active:scale-95 ${
                isAddingToCart ? 'animate-pulse' : ''
              } ${isInCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
            >
              {isAddingToCart ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : isInCart ? (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Added to Cart
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-2">
          {/* Brand */}
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-obeyyo-pink transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
