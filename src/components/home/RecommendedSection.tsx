
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProductSlider from "@/components/ProductSlider";
import SectionBanner from "@/components/SectionBanner";

interface RecommendedSectionProps {
  isLoading: boolean;
}

const RecommendedSection = ({ isLoading }: RecommendedSectionProps) => {
  const recommendedProducts = [{
    id: "r-1",
    name: "Slim Fit Jeans",
    price: 1299,
    originalPrice: 2499,
    rating: 4.6,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    brand: "DenimCo"
  }, {
    id: "r-2",
    name: "Canvas Backpack",
    price: 899,
    originalPrice: 1599,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    brand: "EverydayBags"
  }, {
    id: "r-3",
    name: "Wireless Earbuds",
    price: 1999,
    originalPrice: 3999,
    rating: 4.7,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    brand: "AudioTech"
  }];

  return (
    <section className="bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 mx-4 rounded-2xl p-4 shadow-2xl">
      <div className="mb-4">
        <SectionBanner
          title="Recommended for You"
          subtitle="Personalized picks just for you"
          imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
          height="h-28"
        />
      </div>

      <div className="flex items-center justify-between mb-4 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg animate-pulse">🧠</span>
          <h2 className="text-lg font-bold text-white">AI Curated</h2>
        </div>
        <Link to="/recommended" className="text-sm text-white/90 hover:text-white flex items-center gap-1 font-medium transition-colors">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <ProductSlider title="" products={recommendedProducts} />
    </section>
  );
};

export default RecommendedSection;
