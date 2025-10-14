import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import SectionBanner from "@/components/SectionBanner";

interface CategoryFlashSaleSectionProps {
  isLoading: boolean;
}

const CategoryFlashSaleSection = ({
  isLoading
}: CategoryFlashSaleSectionProps) => {
  const [activeCategory, setActiveCategory] = useState('men');
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 23
  });

  const categoryFlashSaleProducts = {
    men: [{
      id: "men-fs-1",
      name: "Classic Polo Shirt",
      price: 899,
      originalPrice: 1799,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "MenStyle",
      isFlashSale: true
    }, {
      id: "men-fs-2",
      name: "Cargo Pants",
      price: 1299,
      originalPrice: 2499,
      rating: 4.3,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      brand: "UrbanMen",
      isFlashSale: true
    }, {
      id: "men-fs-3",
      name: "Casual Sneakers",
      price: 1999,
      originalPrice: 3999,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "FootWear",
      isFlashSale: true
    }, {
      id: "men-fs-4",
      name: "Denim Jacket",
      price: 1599,
      originalPrice: 2999,
      rating: 4.4,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      brand: "DenimBrand",
      isFlashSale: true
    }],
    women: [{
      id: "women-fs-1",
      name: "Floral Summer Dress",
      price: 1599,
      originalPrice: 2999,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      brand: "FloralWear",
      isFlashSale: true
    }, {
      id: "women-fs-2",
      name: "Denim Jacket",
      price: 1199,
      originalPrice: 2299,
      rating: 4.4,
      reviews: 267,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      brand: "DenimCo",
      isFlashSale: true
    }, {
      id: "women-fs-3",
      name: "High Heels",
      price: 2299,
      originalPrice: 4599,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      brand: "Elegance",
      isFlashSale: true
    }, {
      id: "women-fs-4",
      name: "Handbag",
      price: 1799,
      originalPrice: 3599,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      brand: "LuxBags",
      isFlashSale: true
    }],
    sports: [{
      id: "sports-fs-1",
      name: "Running Shoes",
      price: 2999,
      originalPrice: 5999,
      rating: 4.8,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "SportMax",
      isFlashSale: true
    }, {
      id: "sports-fs-2",
      name: "Gym T-Shirt",
      price: 799,
      originalPrice: 1599,
      rating: 4.4,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "FitWear",
      isFlashSale: true
    }, {
      id: "sports-fs-3",
      name: "Sports Shorts",
      price: 999,
      originalPrice: 1999,
      rating: 4.3,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      brand: "ActiveWear",
      isFlashSale: true
    }, {
      id: "sports-fs-4",
      name: "Water Bottle",
      price: 599,
      originalPrice: 1199,
      rating: 4.5,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400",
      brand: "HydroGear",
      isFlashSale: true
    }],
    accessories: [{
      id: "acc-fs-1",
      name: "Smart Watch",
      price: 3999,
      originalPrice: 7999,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      brand: "TechWear",
      isFlashSale: true
    }, {
      id: "acc-fs-2",
      name: "Sunglasses",
      price: 1299,
      originalPrice: 2599,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      brand: "StyleShades",
      isFlashSale: true
    }, {
      id: "acc-fs-3",
      name: "Wireless Earbuds",
      price: 1999,
      originalPrice: 3999,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      brand: "AudioTech",
      isFlashSale: true
    }, {
      id: "acc-fs-4",
      name: "Leather Wallet",
      price: 899,
      originalPrice: 1799,
      rating: 4.4,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      brand: "LeatherCraft",
      isFlashSale: true
    }]
  };

  const categories = [{
    id: 'men',
    name: "Men's",
    color: "#fc2682"
  }, {
    id: 'women',
    name: "Women's",
    color: "#fc334d"
  }, {
    id: 'sports',
    name: "Sports",
    color: "#08a0ef"
  }, {
    id: 'accessories',
    name: "Accessories",
    color: "#f9b704"
  }];

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

  const ProductGrid = ({
    products,
    showSkeleton = false,
    maxProducts = 4
  }) => {
    const displayProducts = products.slice(0, maxProducts);
    return (
      <div className="grid grid-cols-2 gap-3 px-4">
        {showSkeleton
          ? Array.from({ length: maxProducts }).map((_, i) => (
              <div key={i}>
                <SkeletonLoader type="product" />
              </div>
            ))
          : displayProducts.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
        }
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 mx-4 rounded-2xl p-4 shadow-2xl">
      <div className="mb-4">
        <SectionBanner
          title="Category Flash Sale"
          subtitle="Category-wise exclusive deals"
          imageUrl="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800"
          height="h-28"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide px-1 bg-transparent">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-white text-gray-800 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <ProductGrid 
        products={categoryFlashSaleProducts[activeCategory as keyof typeof categoryFlashSaleProducts]} 
        showSkeleton={isLoading} 
      />

      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-xl backdrop-blur-sm font-semibold shadow-lg" 
          asChild
        >
          <Link to="/flash-sale">
            View All Category Products
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CategoryFlashSaleSection;
