
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PromoItem {
  id: string;
  text: string;
  link: string;
  bgColor: string;
}

interface NarrowPromoCarouselProps {
  promos: PromoItem[];
}

const NarrowPromoCarousel = ({ promos }: NarrowPromoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promos.length]);

  if (promos.length === 0) return null;

  const currentPromo = promos[currentIndex];

  return (
    <section className="px-4">
      <div 
        className="rounded-lg py-3 px-4 text-center transition-all duration-500"
        style={{ backgroundColor: currentPromo.bgColor }}
      >
        <Link to={currentPromo.link} className="block">
          <div className="flex items-center justify-center">
            <span className="text-white font-medium text-sm md:text-base">
              {currentPromo.text}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default NarrowPromoCarousel;
