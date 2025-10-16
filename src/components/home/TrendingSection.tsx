import { Product } from "../../types";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";

// ✅ ADD products prop
interface TrendingSectionProps {
  isLoading: boolean;
  products?: Product[];
}

const TrendingSection = ({ 
  isLoading, 
  products = [] 
}: TrendingSectionProps) => {
  
  const staticTrendingProducts = [{
    id: "t-1",
    name: "Designer Sunglasses",
    price: 1299,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
    brand: "VisionWear",
    isTrending: true
  }];

  const displayProducts = products.length > 0 ? products : staticTrendingProducts;

  return (
    <section className="mx-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
        <button className="text-sm text-blue-600 font-medium">View All</button>
      </div>
      
      <div className="grid grid-cols-2 gap-3 px-4">
        {isLoading 
          ? Array.from({ length: 4 }).map((_, i) => (
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
    </section>
  );
};

export default TrendingSection;