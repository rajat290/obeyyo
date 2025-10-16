import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "../../types";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import SectionBanner from "@/components/SectionBanner";

interface FlashSaleSectionProps {
  isLoading: boolean;
  products?: Product[]; // ✅ Now actually using this prop
}

const FlashSaleSection = ({
  isLoading,
  products = [] // ✅ Default empty array for dynamic products
}: FlashSaleSectionProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 23
  });

  // ✅ Static fallback products - agar API se products nahi aaye toh use karo
  const staticFlashSaleProducts = [{
    id: "fs-1",
    name: "Premium Wireless Headphones",
    price: 1999,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    brand: "AudioMax",
    isFlashSale: true
  }, {
    id: "fs-2",
    name: "Smart Fitness Tracker",
    price: 2499,
    originalPrice: 5999,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    brand: "FitTech",
    isFlashSale: true
  }, {
    id: "fs-3",
    name: "Bluetooth Speaker",
    price: 1299,
    originalPrice: 2499,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    brand: "SoundWave",
    isFlashSale: true
  }, {
    id: "fs-4",
    name: "Wireless Mouse",
    price: 899,
    originalPrice: 1799,
    rating: 4.3,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    brand: "TechGear",
    isFlashSale: true
  }];

  // ✅ DECISION LOGIC: API products ya static products use karo
  const displayProducts = products && products.length > 0 ? products : staticFlashSaleProducts;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const FlashSaleTimer = () => (
    <div className="flex items-center gap-2 text-white">
      <Clock className="w-4 h-4" />
      <span className="text-sm font-semibold">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );

  // ✅ ProductGrid component - ab dynamic products use karta hai
  const ProductGrid = ({
    showSkeleton = false,
    maxProducts = 4
  }: {
    showSkeleton?: boolean;
    maxProducts?: number;
  }) => {
    const productsToShow = displayProducts.slice(0, maxProducts);
    
    return (
      <div className="grid grid-cols-2 gap-3 px-4">
        {showSkeleton 
          ? Array.from({ length: maxProducts }).map((_, i) => (
              <div key={i}>
                <SkeletonLoader type="product" />
              </div>
            ))
          : productsToShow.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
        }
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 mx-4 rounded-2xl p-4 shadow-2xl">
      <div className="mb-4">
        <SectionBanner
          title="Flash Sale"
          subtitle="Limited time mega deals"
          imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800"
          height="h-28"
        />
      </div>
      
      <div className="flex items-center justify-between mb-4 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-white animate-pulse" />
          <span className="text-lg font-bold text-white">Ends In</span>
        </div>
        <FlashSaleTimer />
      </div>
      
      {/* ✅ Yahan ab dynamic products display honge */}
      <ProductGrid showSkeleton={isLoading} />
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-xl backdrop-blur-sm font-semibold shadow-lg" 
          asChild
        >
          <Link to="/flash-sale">
            View All Flash Sale Products
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FlashSaleSection;