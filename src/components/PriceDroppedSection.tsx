
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PriceDroppedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  brand: string;
  priceDropPercent: number;
}

interface PriceDroppedSectionProps {
  products: PriceDroppedProduct[];
}

const PriceDroppedSection = ({ products }: PriceDroppedSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('left')}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll('right')}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-44 sm:w-48 relative">
            <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.priceDropPercent}% Drop
            </div>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceDroppedSection;
