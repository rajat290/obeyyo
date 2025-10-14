import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const BannerCarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const banners = [{
    id: "banner-1",
    title: "Summer Collection 2025",
    subtitle: "Up to 70% off on all summer essentials",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    link: "/summer-collection",
    buttonText: "Shop Now"
  }, {
    id: "banner-2",
    title: "Beauty Bonanza",
    subtitle: "Premium skincare and makeup deals",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    link: "/beauty-deals",
    buttonText: "Explore"
  }, {
    id: "banner-3",
    title: "Fashion Forward",
    subtitle: "Latest trends at unbeatable prices",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
    link: "/fashion-trends",
    buttonText: "Discover"
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? banners.length - 1 : prevIndex - 1);
  };
  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
  };
  return <section className="py-6 bg-white px-0">
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
        {banners.map((banner, index) => <div key={banner.id} className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white px-[24px]">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{banner.title}</h2>
              <p className="text-sm md:text-base mb-4 opacity-90">{banner.subtitle}</p>
              <Link to={banner.link}>
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  {banner.buttonText}
                </Button>
              </Link>
            </div>
          </div>)}
        
        {/* Navigation Arrows */}
        <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white" onClick={goToPrevious}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white" onClick={goToNext}>
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => <button key={index} className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrentIndex(index)} />)}
        </div>
      </div>
    </section>;
};
export default BannerCarouselSection;