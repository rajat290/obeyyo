
import { ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

interface HighlightsOfTheDaySectionProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    brand: string;
    isNew?: boolean;
    isTrending?: boolean;
  }>;
}

const HighlightsOfTheDaySection = ({ products }: HighlightsOfTheDaySectionProps) => {
  return (
    <section className="px-4 py-4 bg-gradient-to-r from-obeyyo-yellow to-obeyyo-orange rounded-2xl mx-2 my-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Highlights of the Day</h2>
        <Link to="#" className="text-sm text-white/80 hover:text-white flex items-center gap-1 font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth pb-2">
        {products.map(product => (
          <div key={product.id} className="flex-shrink-0 w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighlightsOfTheDaySection;
