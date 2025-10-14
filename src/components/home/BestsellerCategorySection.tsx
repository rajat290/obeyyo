
import { useRef } from "react";
import { Link } from "react-router-dom";
import SectionBanner from "@/components/SectionBanner";

const BestsellerCategorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "bc-1",
      name: "Beauty & Personal Care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
      bestseller: "Top Seller",
      link: "/categories/beauty"
    },
    {
      id: "bc-2", 
      name: "Fashion & Accessories",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      bestseller: "Trending",
      link: "/categories/fashion"
    },
    {
      id: "bc-3",
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300",
      bestseller: "Hot Deal",
      link: "/categories/home"
    },
    {
      id: "bc-4",
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      bestseller: "Best Value",
      link: "/categories/electronics"
    }
  ];

  return (
    <section className="px-4 py-6 bg-gray-50">
      <div className="mb-4">
        <SectionBanner
          title="Bestseller Category"
          subtitle="Top-performing categories loved by customers"
          imageUrl="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800"
          height="h-28"
        />
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link key={category.id} to={category.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {category.bestseller}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestsellerCategorySection;
