
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const FootwearBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const footwearBrands = [
    {
      id: "fb-1",
      name: "Sports Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      discount: "Up to 45% OFF",
      link: "/footwear?category=sports"
    },
    {
      id: "fb-2", 
      name: "Casual Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", 
      discount: "Up to 40% OFF",
      link: "/footwear?category=casual"
    },
    {
      id: "fb-3",
      name: "Formal Shoes",
      image: "https://images.unsplash.com/photo-1448387473223-5c37445527e7?w=300",
      discount: "Up to 35% OFF", 
      link: "/footwear?category=formal"
    },
    {
      id: "fb-4",
      name: "Sandals",
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300",
      discount: "Up to 50% OFF",
      link: "/footwear?category=sandals"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-6 bg-gray-50">
      <div className="mb-4">
        <SectionBanner
          title="Footwear Brands & Offers"
          subtitle="Step up your style game"
          imageUrl="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
          link="/footwear"
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
        {footwearBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">
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

export default FootwearBrandsSection;
