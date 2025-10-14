import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface Brand {
  id: string;
  name: string;
  logo: string;
  discount: string;
  link: string;
}
interface FeaturedBrandsProps {
  brands: Brand[];
}
const FeaturedBrands = ({
  brands
}: FeaturedBrandsProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <section className="px-4 py-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => scroll('left')} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => scroll('right')} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div ref={sliderRef} className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide scroll-smooth" style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch'
    }}>
        {brands.map(brand => <Link key={brand.id} to={brand.link} className="flex-shrink-0 w-32 sm:w-36">
            <div className="border-2 border-gray-100 p-6 hover:shadow-lg transition-all hover:border-obeyyo-pink/30 group rounded-full bg-orange-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-md transition-all rounded-full bg-zinc-950">
                  <img src={brand.logo} alt={brand.name} className="w-160 h-160 object-cover" />
                </div>
                <h3 className="font-bold text-sm mb-2 text-gray-800">
                  {brand.name}
                </h3>
                <p className="text-xs text-obeyyo-pink font-semibold bg-pink-50 px-3 py-1 rounded-full">
                  {brand.discount}
                </p>
              </div>
            </div>
          </Link>)}
      </div>
    </section>;
};
export default FeaturedBrands;