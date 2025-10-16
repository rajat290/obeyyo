import { Product } from "../../types";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";

// ✅ ADD products prop
interface TopPicksSectionProps {
  isLoading: boolean;
  products?: Product[];
}

const TopPicksSection = ({ 
  isLoading, 
  products = [] 
}: TopPicksSectionProps) => {
  
  const staticTopPicks = [{
    id: "tp-1",
    name: "Premium Headphones",
    price: 5999,
    originalPrice: 9999,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    brand: "AudioMax"
  }];

  const displayProducts = products.length > 0 ? products : staticTopPicks;

  return (
    <section className="mx-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-gray-900">Top Picks For You</h2>
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

export default TopPicksSection;