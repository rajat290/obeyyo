
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const MensBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const mensBrands = [
    {
      id: "mb-1",
      name: "Men's Nike",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      discount: "Up to 40% OFF",
      link: "/men?brand=nike"
    },
    {
      id: "mb-2", 
      name: "Men's Adidas",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300", 
      discount: "Up to 35% OFF",
      link: "/men?brand=adidas"
    },
    {
      id: "mb-3",
      name: "Men's Puma",
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300",
      discount: "Up to 50% OFF", 
      link: "/men?brand=puma"
    },
    {
      id: "mb-4",
      name: "Men's Formal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      discount: "Up to 30% OFF",
      link: "/men?category=formal"
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
          title="Men's Brands & Offers"
          subtitle="Premium collection for modern men"
          imageUrl="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800"
          link="/men"
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
        {mensBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
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

export default MensBrandsSection;
