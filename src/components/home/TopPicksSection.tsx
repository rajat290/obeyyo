
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductSlider from "@/components/ProductSlider";

interface TopPicksSectionProps {
  isLoading: boolean;
}

const TopPicksSection = ({ isLoading }: TopPicksSectionProps) => {
  const topPicks = [{
    id: "tp-1",
    name: "Nike Air Max Sneakers",
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    brand: "Nike",
    isTopRated: true
  }, {
    id: "tp-2",
    name: "Premium Watch",
    price: 15999,
    originalPrice: 24999,
    rating: 4.8,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    brand: "TimeMaster",
    isTopRated: true
  }];

  return (
    <section className="bg-gradient-to-br from-slate-700 via-gray-800 to-zinc-900 mx-4 rounded-2xl p-4 shadow-2xl">
      <div className="flex items-center justify-between mb-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg animate-bounce">🏆</span>
          <h2 className="text-lg font-bold text-white">Top Picks</h2>
        </div>
        <Link to="/top-picks" className="text-sm text-white/90 hover:text-white flex items-center gap-1 font-medium transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <ProductSlider title="" products={topPicks} />
    </section>
  );
};

export default TopPicksSection;
