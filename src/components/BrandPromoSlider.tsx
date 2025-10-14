
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BrandPromo {
  id: string;
  name: string;
  logo: string;
  image: string; // main background image, not just logo
  discount?: string;
  link: string;
  // Optional extra label/text (rare use)
  label?: string;
}

interface BrandPromoSliderProps {
  title?: string;
  labelText?: string;
  brands: BrandPromo[];
}

const BrandPromoSlider = ({ title, labelText, brands }: BrandPromoSliderProps) => {
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

  if (!brands || brands.length === 0) return null;

  return (
    <section className="px-4 py-6 bg-white">
      {(title || labelText) && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
            {labelText && (
              <span className="bg-pink-100 text-pink-500 px-2 py-1 rounded text-xs">
                {labelText}
              </span>
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
      )}
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
            className="flex-shrink-0 w-[40vw] md:w-[30vw] max-w-xs"
            style={{ minWidth: "220px" }}
          >
            <div className="relative rounded-xl overflow-hidden h-64 group shadow-lg transition-all border-2 border-pink-100 hover:border-pink-300">
              <img 
                src={brand.image} 
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                <h3 className="text-lg font-bold drop-shadow">{brand.name}</h3>
                {brand.discount && (
                  <p className="text-sm bg-pink-500 px-2 py-1 rounded-full inline-block mt-1 drop-shadow">
                    {brand.discount}
                  </p>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <img src={brand.logo} alt={`${brand.name} logo`} className="w-10 h-10 rounded-full border-2 border-white shadow" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandPromoSlider;
