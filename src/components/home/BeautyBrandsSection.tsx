
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const BeautyBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const beautyBrands = [
    {
      id: "bb-1",
      name: "Skincare",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
      discount: "Up to 40% OFF",
      link: "/beauty?category=skincare"
    },
    {
      id: "bb-2", 
      name: "Makeup",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300", 
      discount: "Up to 35% OFF",
      link: "/beauty?category=makeup"
    },
    {
      id: "bb-3",
      name: "Perfumes",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
      discount: "Up to 50% OFF", 
      link: "/beauty?category=perfumes"
    },
    {
      id: "bb-4",
      name: "Hair Care",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300",
      discount: "Up to 30% OFF",
      link: "/beauty?category=haircare"
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
          title="Beauty Brands & Offers"
          subtitle="Glow up with premium beauty essentials"
          imageUrl="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800"
          link="/beauty"
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
        {beautyBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
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

export default BeautyBrandsSection;
