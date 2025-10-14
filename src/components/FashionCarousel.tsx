
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FashionCarouselProps {
  section: "men" | "women" | "kids" | "beauty" | "footwear";
  title: string;
  subtitle: string;
}

const FashionCarousel = ({ section, title, subtitle }: FashionCarouselProps) => {
  const getGradientClass = () => {
    switch (section) {
      case "men":
        return "from-blue-600 to-purple-600";
      case "women":
        return "from-pink-500 to-rose-500";
      case "kids":
        return "from-yellow-400 to-orange-500";
      case "beauty":
        return "from-pink-400 to-purple-500";
      case "footwear":
        return "from-blue-500 to-teal-500";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  return (
    <div className={`relative bg-gradient-to-r ${getGradientClass()} text-white py-8 px-4 overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white transform -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white transform translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 capitalize">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6">
          {subtitle}
        </p>
        
        {/* Navigation Arrows */}
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-3">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-3">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
};

export default FashionCarousel;
