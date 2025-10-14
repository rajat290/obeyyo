import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface PromoBannerProps {
  banner: {
    id: string;
    title: string;
    subtitle?: string;
    buttonText: string;
    buttonLink: string;
    image: string;
    backgroundColor: string;
  };
  className?: string;
}
const PromoBanner = ({
  banner,
  className = ""
}: PromoBannerProps) => {
  return <div className={`relative rounded-xl overflow-hidden h-48 md:h-56 ${className}`} style={{
    backgroundColor: banner.backgroundColor
  }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10" />
      
      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-8">
        <div className="max-w-md">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            {banner.title}
          </h2>
          {banner.subtitle && <p className="text-white/90 text-sm md:text-base mb-4">
              {banner.subtitle}
            </p>}
          <Link to={banner.buttonLink}>
            <Button className="font-medium bg-brand-green text-white">
              {banner.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>;
};
export default PromoBanner;