
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Brand {
  id: string;
  name: string;
  logo: string;
  discount?: string;
}

interface BrandsFlexSectionProps {
  brands: Brand[];
}

const BrandsFlexSection = ({ brands }: BrandsFlexSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 16; // 4x4 grid
  const maxSlides = Math.ceil(brands.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentBrands = () => {
    const start = currentSlide * itemsPerSlide;
    return brands.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="px-3">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">🏢 Brands Flex</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentSlide === maxSlides - 1}
              className="p-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {getCurrentBrands().map((brand) => (
            <div
              key={brand.id}
              className="bg-gray-50 rounded-lg p-3 text-center hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="text-xs font-medium text-gray-800 truncate">{brand.name}</p>
              {brand.discount && (
                <p className="text-xs text-obeyyo-red font-semibold mt-1">{brand.discount}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: maxSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-obeyyo-blue" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsFlexSection;
