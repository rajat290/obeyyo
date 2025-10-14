
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const TodaysSpecialsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end time to 24 hours from now for demo
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialProducts = [
    {
      id: "ts-1",
      name: "Premium Watch",
      price: 1999,
      originalPrice: 3999,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      brand: "TimeZone"
    },
    {
      id: "ts-2",
      name: "Wireless Headphones", 
      price: 2499,
      originalPrice: 4999,
      rating: 4.3,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      brand: "SoundMax"
    }
  ];

  return (
    <section className="px-4 py-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            ⚡ Today's Specials
          </h2>
          <p className="text-sm text-gray-600">Limited time offers</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg px-2 py-1 min-w-[40px] shadow-lg">
              <div className="text-sm font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs">Hours</div>
            </div>
          </div>
          <span className="text-red-500 font-bold animate-pulse">:</span>
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg px-2 py-1 min-w-[40px] shadow-lg">
              <div className="text-sm font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs">Min</div>
            </div>
          </div>
          <span className="text-red-500 font-bold animate-pulse">:</span>
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg px-2 py-1 min-w-[40px] shadow-lg">
              <div className="text-sm font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs">Sec</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
        {specialProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-44">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysSpecialsSection;
