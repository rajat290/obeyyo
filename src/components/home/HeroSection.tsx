import ImageCarousel from "@/components/ImageCarousel";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Link } from "react-router-dom";
interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}
interface HeroSectionProps {
  carouselImages: Array<{
    id: string;
    url: string;
    title: string;
    subtitle: string;
  }>;
  isLoading: boolean;
  categories: Category[];
}
const HeroSection = ({
  carouselImages,
  isLoading,
  categories
}: HeroSectionProps) => {
  return <>
      {/* Horizontal Scrollable Categories Bar */}
      <div className="w-full px-2 py-3 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
          {categories.map(cat => <Link key={cat.id} to={cat.link} style={{
          flex: "0 0 60px"
        }} className="flex flex-col items-center min-w-[60px] w-16 mx-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-200 hover-lift transition">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-xs text-gray-700 mt-2 text-center whitespace-nowrap">{cat.name}</span>
            </Link>)}
        </div>
      </div>

      {/* Hero Carousel (remains) */}
      <div className="px-0">
        <div className="relative w-full h-48 rounded-2xl overflow-hidden">
          {isLoading ? <SkeletonLoader type="banner" /> : <ImageCarousel images={carouselImages} />}
        </div>
      </div>
    </>;
};
export default HeroSection;