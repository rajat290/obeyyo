import { Product } from "../../types";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";

// ✅ ADD products prop interface
interface NewArrivalsSectionProps {
  isLoading: boolean;
  products?: Product[]; // Add this line
}

const NewArrivalsSection = ({ 
  isLoading, 
  products = [] // ✅ Accept products prop
}: NewArrivalsSectionProps) => {
  
  // ✅ Static fallback data
  const staticNewArrivals = [{
    id: "na-1",
    name: "Smart Watch Pro",
    price: 8999,
    originalPrice: 12999,
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    brand: "TechWear",
    isNew: true
  }, {
    id: "na-2",
    name: "Wireless Earbuds",
    price: 2999,
    originalPrice: 4999,
    rating: 4.5,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e0?w=400",
    brand: "SoundPro",
    isNew: true
  }];

  // ✅ Smart selection: API products OR static fallback
  const displayProducts = products.length > 0 ? products : staticNewArrivals;

  return (
    <section className="mx-4">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-gray-900">New Arrivals</h2>
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

export default NewArrivalsSection;