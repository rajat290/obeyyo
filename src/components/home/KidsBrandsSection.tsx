
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionBanner from "@/components/SectionBanner";

const KidsBrandsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const kidsBrands = [
    {
      id: "kb-1",
      name: "Kids Toys",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300",
      discount: "Up to 50% OFF",
      link: "/kids?category=toys"
    },
    {
      id: "kb-2", 
      name: "Kids Clothing",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300", 
      discount: "Up to 40% OFF",
      link: "/kids?category=clothing"
    },
    {
      id: "kb-3",
      name: "Kids Shoes",
      image: "https://images.unsplash.com/photo-1514590353445-40144ca613de?w=300",
      discount: "Up to 45% OFF", 
      link: "/kids?category=shoes"
    },
    {
      id: "kb-4",
      name: "Kids Books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300",
      discount: "Up to 30% OFF",
      link: "/kids?category=books"
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
          title="Kids Brands & Offers"
          subtitle="Fun and playful collections for little ones"
          imageUrl="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800"
          link="/kids"
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
        {kidsBrands.map((brand) => (
          <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-48 group">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={brand.image} 
                  alt={brand.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
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

export default KidsBrandsSection;
