
import { Link } from "react-router-dom";

interface SectionBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  height?: string;
  overlayOpacity?: number;
}

const SectionBanner = ({ 
  title, 
  subtitle, 
  imageUrl, 
  link, 
  height = "h-32", 
  overlayOpacity = 0.4 
}: SectionBannerProps) => {
  const BannerContent = () => (
    <div className={`relative w-full ${height} rounded-xl overflow-hidden shadow-lg group cursor-pointer`}>
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
        <h2 className="text-xl md:text-2xl font-bold drop-shadow-lg mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base opacity-90 drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block">
        <BannerContent />
      </Link>
    );
  }

  return <BannerContent />;
};

export default SectionBanner;
