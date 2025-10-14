
import { Link } from "react-router-dom";

const NarrowPromoBanner = () => {
  return (
    <section className="px-4">
      <div className="bg-gradient-to-r from-[#FF6B9D] to-[#FF9A6B] rounded-lg py-3 px-4 text-center">
        <Link to="/flash-sale" className="block">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white font-bold text-sm md:text-base">
              ⚡ FLASH SALE: Up to 70% OFF
            </span>
            <span className="text-white/90 text-xs md:text-sm">
              | Limited Time Only!
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default NarrowPromoBanner;
