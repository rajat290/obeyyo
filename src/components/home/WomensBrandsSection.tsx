
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const WomensBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const womensBrands = [
    {
      id: "wb-1",
      name: "Women's Zara",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      discount: "Up to 45% OFF",
      link: "/women?brand=zara"
    },
    {
      id: "wb-2", 
      name: "Women's H&M",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300", 
      discount: "Up to 40% OFF",
      link: "/women?brand=hm"
    },
    {
      id: "wb-3",
      name: "Women's Ethnic",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300",
      discount: "Up to 60% OFF", 
      link: "/women?category=ethnic"
    },
    {
      id: "wb-4",
      name: "Women's Party",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300",
      discount: "Up to 35% OFF",
      link: "/women?category=party"
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
          title="Women's Brands & Offers"
          subtitle="Fashion forward styles for every occasion"
          imageUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800"
          link="/women"
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
        {womensBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
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

export default WomensBrandsSection;
