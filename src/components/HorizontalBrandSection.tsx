
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Brand {
  id: string;
  name: string;
  logo: string;
  discount?: string;
  label?: string;
  link: string;
}

interface HorizontalBrandSectionProps {
  title: string;
  brands: Brand[];
  labelColor?: string;
  labelText?: string;
}

const HorizontalBrandSection = ({
  title,
  brands,
  labelText = "",
  labelColor = "bg-gray-200 text-gray-600",
}: HorizontalBrandSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="px-4 py-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {labelText && (
            <span className={`${labelColor} px-2 py-1 rounded text-xs`}>{labelText}</span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => scroll('left')} className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => scroll('right')} className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={brand.link}
            className="flex-shrink-0 w-32 sm:w-36"
            style={{ minWidth: "120px" }}
          >
            <div className="border-2 border-gray-100 p-6 hover:shadow-lg transition-all hover:border-obeyyo-pink/30 group rounded-full bg-orange-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:shadow-md transition-all rounded-full">
                  <img src={brand.logo} alt={brand.name} className="w-16 h-16 object-cover" />
                </div>
                <h3 className="font-bold text-sm mb-2 text-gray-800">
                  {brand.name}
                </h3>
                {brand.discount && (
                  <p className="text-xs text-obeyyo-pink font-semibold bg-pink-50 px-3 py-1 rounded-full">
                    {brand.discount}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HorizontalBrandSection;
