import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, Heart, Share2, ChevronLeft, Plus, Minus, Ruler, MapPin, Truck, Shield, RotateCcw, Upload, CheckCircle, Clock, Zap, ChevronDown, Search, Gift, Copy, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SizeGuide from "@/components/SizeGuide";
import ProductSlider from "@/components/ProductSlider";
import PromoBanner from "@/components/PromoBanner";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [reviewImages, setReviewImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [show360View, setShow360View] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [seoExpanded, setSeoExpanded] = useState(false);

  // Mock product data with enhanced features
  const product = {
    id: id || "1",
    name: "Premium Cotton T-Shirt with Modern Design",
    price: 599,
    originalPrice: 999,
    rating: 4.5,
    reviews: 128,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f37f3823?w=600",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600"
    ],
    brand: "StyleCo",
    description: "Experience ultimate comfort with our premium cotton t-shirt featuring a modern design. Made from 100% organic cotton, this shirt offers exceptional breathability and softness that lasts wash after wash.",
    sizes: [
      { name: "XS", stock: "Out of Stock" },
      { name: "S", stock: "Low Stock" },
      { name: "M", stock: "In Stock" },
      { name: "L", stock: "In Stock" },
      { name: "XL", stock: "Only 3 left" },
      { name: "XXL", stock: "In Stock" }
    ],
    colors: [
      { name: "Black", code: "#000000" },
      { name: "White", code: "#FFFFFF" },
      { name: "Navy Blue", code: "#1E3A8A" },
      { name: "Charcoal Gray", code: "#6B7280" },
      { name: "Crimson Red", code: "#DC2626" }
    ],
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Machine washable",
      "Breathable and comfortable",
      "Modern fit design"
    ],
    modelInfo: "Model is 6'1\", wearing size L"
  };

  // Customer reviews data
  const customerReviews = [
    {
      id: "1",
      name: "Rahul Sharma",
      rating: 5,
      review: "Amazing quality! The fabric is so soft and comfortable. Perfect fit and great value for money.",
      date: "2 days ago",
      verified: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50"
    },
    {
      id: "2", 
      name: "Priya Singh",
      rating: 4,
      review: "Love the design and color. Good quality material. Delivery was fast too!",
      date: "1 week ago",
      verified: true,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=50"
    },
    {
      id: "3",
      name: "Amit Kumar",
      rating: 5,
      review: "Excellent product! Fits perfectly and the fabric quality is outstanding.",
      date: "2 weeks ago",
      verified: true,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50"
    }
  ];

  // Check if product is already in wishlist/cart
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.includes(product.id));
  }, [product.id]);

  // Handle scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const savings = product.originalPrice - product.price;

  // Wishlist toggle with animation
  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let updatedWishlist;
    
    if (isWishlisted) {
      updatedWishlist = wishlist.filter((id: string) => id !== product.id);
      setIsWishlisted(false);
      toast({
        title: "Removed from Wishlist",
        description: "Product removed from your wishlist",
      });
    } else {
      updatedWishlist = [...wishlist, product.id];
      setIsWishlisted(true);
      toast({
        title: "❤️ Added to Wishlist!",
        description: "Product saved to your wishlist",
        className: "bg-pink-50 border-pink-200 text-pink-800",
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find((item: any) => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map((item: any) => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        brand: product.brand,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      };
      updatedCart = [...cart, cartItem];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    
    toast({
      title: "🛒 Added to Cart!",
      description: `${quantity} item(s) added to your cart`,
      className: "bg-green-50 border-green-200 text-green-800",
    });
  };

  // Copy coupon code
  const copyCouponCode = () => {
    navigator.clipboard.writeText("OBEYYO10");
    setCopiedCoupon(true);
    toast({
      title: "Coupon Copied!",
      description: "OBEYYO10 copied to clipboard",
    });
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  // Mock delivery data
  const checkDelivery = () => {
    if (pincode.length === 6) {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      setDeliveryInfo({
        available: true,
        date: deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
        standardDelivery: "3-5 business days",
        expressDelivery: "1-2 business days"
      });
    } else {
      setDeliveryInfo({ available: false, message: "Please enter a valid 6-digit pincode" });
    }
  };

  // Mock photo reviews
  const photoReviews = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
  ];

  // Mock style products
  const styleWithProducts = [
    {
      id: "style-1",
      name: "Slim Fit Jeans",
      price: 1299,
      originalPrice: 1899,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      brand: "DenimCo"
    },
    {
      id: "style-2",
      name: "Classic Sneakers",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      brand: "FootWear"
    },
    {
      id: "style-3",
      name: "Baseball Cap",
      price: 599,
      originalPrice: 899,
      image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300",
      brand: "CapStyle"
    }
  ];

  // Mock promo and related products data
  const promoBanner = {
    id: "promo1",
    title: "Limited Time Offer",
    subtitle: "Extra 20% off on orders above ₹1999",
    buttonText: "Shop Now",
    buttonLink: "/",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800",
    backgroundColor: "#FF6B9D"
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Classic Polo Shirt",
      price: 799,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400",
      brand: "StyleCo"
    }
  ];

  const selectedSizeData = product.sizes.find(size => size.name === selectedSize);

  return (
    <TooltipProvider>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>

          {/* First Order Offer Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">🎁 First Order Offer: Get a Free Gift on Orders Above ₹999!</span>
              </div>
              <Button size="sm" className="bg-white text-orange-600 hover:bg-white/90">
                Claim Now
              </Button>
            </div>
          </div>

          {/* Coupon Code Reveal */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-purple-800 font-medium">🔖 Special Discount Code:</span>
                <code className="bg-purple-100 text-purple-900 px-2 py-1 rounded font-mono">OBEYYO10</code>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={copyCouponCode}
                className="border-purple-300 text-purple-700 hover:bg-purple-100"
              >
                {copiedCoupon ? <CheckCircle className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copiedCoupon ? "Copied!" : "Copy Code"}
              </Button>
            </div>
            <p className="text-purple-600 text-sm mt-1">Get 10% OFF on your order!</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Product Images */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover cursor-pointer transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  } ${isRotating ? 'animate-spin' : ''}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* 360° View Button */}
                <Button
                  className="absolute top-3 left-3 bg-white/90 text-gray-700 hover:bg-white"
                  size="sm"
                  onClick={() => {
                    setIsRotating(true);
                    setTimeout(() => setIsRotating(false), 2000);
                  }}
                >
                  <RotateCw className="w-4 h-4 mr-1" />
                  360°
                </Button>

                {/* Zoom Indicator */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  <Search className="w-3 h-3 inline mr-1" />
                  {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                </div>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md sm:rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mt-1 leading-tight">{product.name}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-sm sm:text-base">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs sm:text-sm px-2 py-1 rounded-full w-fit">
                    {discountPercent}% OFF
                  </span>
                </div>
              </div>

              {/* Enhanced Price Block */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-800">₹{product.price}</span>
                  <span className="text-lg sm:text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                </div>
                <div className="text-green-600 font-semibold">
                  You Save ₹{savings} ({discountPercent}%)
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Customer Reviews</h3>
                <div className="space-y-3">
                  {customerReviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="bg-white rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{review.name}</span>
                              {review.verified && (
                                <Badge className="text-xs bg-green-100 text-green-800">Verified</Badge>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{review.review}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-blue-600">
                    View All {product.reviews} Reviews
                  </Button>
                </div>
              </div>

              {/* Color Selection with Tooltips */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Select Color</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <Tooltip key={color.name}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 relative transition-all duration-200 ${
                            selectedColor === color.name
                              ? "border-primary shadow-lg shadow-primary/50 scale-110"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color.code }}
                        >
                          {selectedColor === color.name && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-2 h-2 rounded-full ${color.name === 'White' ? 'bg-gray-800' : 'bg-white'}`} />
                            </div>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{color.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
              </div>

              {/* Enhanced Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">Select Size</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSizeGuide(true)}
                      className="text-primary hover:text-primary/80 p-0 h-auto font-normal text-sm"
                    >
                      <Ruler className="w-4 h-4 mr-1" />
                      Size Guide
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 p-0 h-auto font-normal text-sm"
                    >
                      What's My Size?
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <div key={size.name} className="text-center">
                      <button
                        onClick={() => setSelectedSize(size.name)}
                        disabled={size.stock === "Out of Stock"}
                        className={`w-full h-12 rounded-lg border font-medium text-sm relative ${
                          selectedSize === size.name
                            ? "border-primary bg-primary text-white"
                            : size.stock === "Out of Stock"
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {size.name}
                      </button>
                      <div className="text-xs mt-1">
                        {size.stock === "In Stock" && (
                          <span className="text-green-600">✓ In Stock</span>
                        )}
                        {size.stock === "Low Stock" && (
                          <span className="text-orange-600">⚠ Low Stock</span>
                        )}
                        {size.stock === "Out of Stock" && (
                          <span className="text-red-600">✗ Out of Stock</span>
                        )}
                        {size.stock.includes("Only") && (
                          <span className="text-red-600">🔥 {size.stock}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Model Info */}
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-800">{product.modelInfo}</p>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Quantity</h3>
                <div className="flex items-center border rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue hover:opacity-90 text-white h-11 sm:h-12 text-sm sm:text-base"
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={`h-11 sm:h-12 px-3 sm:px-4 transition-all duration-200 ${
                    isWishlisted ? 'animate-bounce' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isWishlisted ? 'fill-red-500 text-red-500' : ''
                  }`} />
                </Button>
                <Button variant="outline" size="lg" className="h-11 sm:h-12 px-3 sm:px-4">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Trust Badge Section */}
              <div className="flex justify-between items-center bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">100% Original</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Easy 7-Day Returns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">Fast Delivery</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600 text-sm sm:text-base">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Delivery ETA Section */}
          <div className="mt-12 bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
            
            {/* Countdown Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Order within</span>
                  <span className="font-bold text-red-600">{timeLeft.hours}h {timeLeft.minutes}m</span>
                </div>
                <span className="text-sm text-red-600">for same day dispatch</span>
              </div>
            </div>

            {/* Pincode Check */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Check Delivery Options
              </h3>
              <div className="flex gap-3 max-w-md">
                <Input
                  type="text"
                  placeholder="Enter pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1"
                />
                <Button onClick={checkDelivery} variant="outline">
                  Check
                </Button>
              </div>
              
              {deliveryInfo && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  {deliveryInfo.available ? (
                    <div className="space-y-2">
                      <p className="text-green-600 font-medium">✓ Delivery available to {pincode}</p>
                      <p className="text-lg font-semibold text-blue-800">
                        Get it by {deliveryInfo.date}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2 text-blue-600" />
                          <span>Standard: {deliveryInfo.standardDelivery}</span>
                        </div>
                        <div className="flex items-center">
                          <Truck className="w-4 h-4 mr-2 text-green-600" />
                          <span>Express: {deliveryInfo.expressDelivery}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-600">{deliveryInfo.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="mt-12 bg-white rounded-xl border">
            <Collapsible open={seoExpanded} onOpenChange={setSeoExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between p-6 text-left">
                  <h2 className="text-xl font-bold text-gray-800">More About This Product</h2>
                  <ChevronDown className={`w-5 h-5 transition-transform ${seoExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <div className="space-y-4 text-gray-600">
                  <p>
                    Discover the perfect blend of style and comfort with our Premium Cotton T-Shirt. Crafted from 100% organic cotton, this modern design piece represents the epitome of sustainable fashion. Whether you're looking for casual wear, streetwear, or premium basics, this t-shirt delivers exceptional quality that lasts.
                  </p>
                  <p>
                    Our premium cotton fabric undergoes specialized pre-shrinking treatment, ensuring your t-shirt maintains its perfect fit wash after wash. The breathable material makes it ideal for all seasons, while the modern cut flatters every body type. Perfect for layering or wearing solo, this versatile piece belongs in every fashion-conscious individual's wardrobe.
                  </p>
                  <p>
                    Made with ethical manufacturing practices and sustainable materials, this t-shirt not only looks good but also feels good to wear. The superior craftsmanship ensures durability, making it a smart investment for your clothing collection. Available in multiple colors and sizes to suit every preference and style.
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Photo Review Carousel */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Photos</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {photoReviews.map((review, index) => (
                <div key={index} className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
                  <img src={review} alt={`Customer review ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Style It With Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Style It With</h2>
              <Button className="bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white">
                + Add All to Cart
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {styleWithProducts.map((item) => (
                <div key={item.id} className="bg-white rounded-lg border p-4 space-y-3">
                  <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-obeyyo-pink">₹{item.price}</span>
                      <span className="text-xs text-gray-500 line-through">₹{item.originalPrice}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="mt-12">
            <PromoBanner banner={promoBanner} />
          </div>

          {/* You May Also Like Section */}
          <div className="mt-12">
            <ProductSlider title="You May Also Like" products={relatedProducts} />
          </div>
        </div>

        {/* Sticky Add-to-Cart Bar */}
        {showStickyBar && (
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg z-30 p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">₹{product.price}</span>
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              </div>
              
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size.name} value={size.name} disabled={size.stock === "Out of Stock"}>
                      {size.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-1">
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        <SizeGuide isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />
      </Layout>
    </TooltipProvider>
  );
};

export default ProductDetail;
