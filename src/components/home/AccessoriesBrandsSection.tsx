
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const AccessoriesBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const accessoriesBrands = [
    {
      id: "ab-1",
      name: "Watches",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300",
      discount: "Up to 60% OFF",
      link: "/accessories?category=watches"
    },
    {
      id: "ab-2", 
      name: "Bags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300", 
      discount: "Up to 45% OFF",
      link: "/accessories?category=bags"
    },
    {
      id: "ab-3",
      name: "Jewelry",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300",
      discount: "Up to 40% OFF", 
      link: "/accessories?category=jewelry"
    },
    {
      id: "ab-4",
      name: "Sunglasses",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300",
      discount: "Up to 35% OFF",
      link: "/accessories?category=sunglasses"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-6 bg-white">
      <div className="mb-4">
        <SectionBanner
          title="Accessories Brands & Offers"
          subtitle="Complete your look with stylish accessories"
          imageUrl="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"
          link="/accessories"
          height="h-28"
        />
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => scroll('left')} className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => scroll('right')} className="p-2">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {accessoriesBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {brand.discount}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm">{brand.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesBrandsSection;
