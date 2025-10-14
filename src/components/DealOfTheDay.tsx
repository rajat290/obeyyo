
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface DealOfTheDayProps {
  product: any;
  endTime: Date;
}

const DealOfTheDay = ({ product, endTime }: DealOfTheDayProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="bg-gradient-to-r from-brand-orange/10 to-brand-pink/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">⚡ Deal of the Day</h2>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
              <div className="text-lg font-bold text-brand-orange">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
              <div className="text-lg font-bold text-brand-orange">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Min</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
              <div className="text-lg font-bold text-brand-orange">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs text-gray-500">Sec</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-sm">
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default DealOfTheDay;
