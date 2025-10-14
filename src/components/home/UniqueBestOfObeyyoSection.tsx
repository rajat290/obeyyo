
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import SectionBanner from "@/components/SectionBanner";

const UniqueBestOfObeyyoSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const uniqueProducts = [
    {
      id: "uo-1",
      name: "Signature Collection Dress",
      price: 2999,
      originalPrice: 4999,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      brand: "Obeyyo",
      isNew: true
    },
    {
      id: "uo-2",
      name: "Exclusive Handbag",
      price: 1899,
      originalPrice: 2999,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", 
      brand: "Obeyyo",
      isTrending: true
    },
    {
      id: "uo-3",
      name: "Premium Skincare Set",
      price: 3499,
      originalPrice: 5999,
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
      brand: "Obeyyo",
      isNew: true
    }
  ];

  return (
    <section className="px-4 py-6 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="mb-4">
        <SectionBanner
          title="Unique Best of Obeyyo"
          subtitle="Exclusive collections you won't find anywhere else"
          imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
          height="h-28"
        />
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {uniqueProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-44">
            <div className="relative">
              <ProductCard product={product} />
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Exclusive
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniqueBestOfObeyyoSection;
