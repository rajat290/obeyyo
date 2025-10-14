
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ChevronLeft, Filter, SortAsc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const BrandPage = () => {
  const { brandName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popularity");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock brand data
  const brandInfo = {
    nike: {
      name: "Nike",
      logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
      description: "Just Do It - Premium sportswear and lifestyle brand",
      totalProducts: 245,
      discount: "Up to 50% OFF"
    },
    adidas: {
      name: "Adidas",
      logo: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=100",
      description: "Impossible is Nothing - Performance and style combined",
      totalProducts: 189,
      discount: "Up to 40% OFF"
    },
    puma: {
      name: "Puma",
      logo: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=100",
      description: "Forever Faster - Athletic and casual wear",
      totalProducts: 167,
      discount: "Up to 60% OFF"
    }
  };

  const brand = brandInfo[brandName as keyof typeof brandInfo] || {
    name: brandName || "Brand",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
    description: "Premium brand products",
    totalProducts: 100,
    discount: "Up to 30% OFF"
  };

  const mockProducts = [
    {
      id: "bp-1",
      name: `${brand.name} Running Shoes`,
      price: 8999,
      originalPrice: 12999,
      rating: 4.8,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: brand.name,
      isTrending: true
    },
    {
      id: "bp-2",
      name: `${brand.name} Track Jacket`,
      price: 3999,
      originalPrice: 5999,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
      brand: brand.name,
      isNew: true
    },
    {
      id: "bp-3",
      name: `${brand.name} Sports T-Shirt`,
      price: 1299,
      originalPrice: 1999,
      rating: 4.4,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: brand.name
    },
    {
      id: "bp-4",
      name: `${brand.name} Cap`,
      price: 899,
      originalPrice: 1299,
      rating: 4.2,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
      brand: brand.name
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white sticky top-[88px] z-30 border-b">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-gray-800">{brand.name}</h1>
            </div>
          </div>
        </div>

        {/* Brand Info */}
        <div className="bg-gradient-to-r from-[#FF6B9D] to-[#4A90E2] text-white p-6 mx-4 mt-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-16 h-16 bg-white rounded-full p-2 object-contain"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{brand.name}</h2>
              <p className="text-white/90 text-sm mt-1">{brand.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-white/20 text-white">
                  {brand.totalProducts} Products
                </Badge>
                <Badge className="bg-white/20 text-white">
                  {brand.discount}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center justify-between px-4 py-3 bg-white mx-4 mt-4 rounded-xl shadow-sm">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SortAsc className="w-4 h-4" />
            Sort
          </Button>
        </div>

        {/* Products Grid */}
        <div className="px-4 py-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} type="product" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrandPage;
