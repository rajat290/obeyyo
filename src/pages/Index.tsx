import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import FlashSaleSection from "@/components/home/FlashSaleSection";
import CategoryFlashSaleSection from "@/components/home/CategoryFlashSaleSection";
import TrendingSection from "@/components/home/TrendingSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import ShopByBrandsSection from "@/components/home/ShopByBrandsSection";
import BankOffersSection from "@/components/home/BankOffersSection";
import TopPicksSection from "@/components/home/TopPicksSection";
import PromoBanner from "@/components/PromoBanner";
import RoundCategorySection from "@/components/RoundCategorySection";
import PocketFriendlyBargainSection from "@/components/home/PocketFriendlyBargainSection";
import FeaturedBrandsSection from "@/components/home/FeaturedBrandsSection";
import BestsellerCategorySection from "@/components/home/BestsellerCategorySection";
import TodaysSpecialsSection from "@/components/home/TodaysSpecialsSection";
import UniqueBestOfObeyyoSection from "@/components/home/UniqueBestOfObeyyoSection";
import BannerCarouselSection from "@/components/home/BannerCarouselSection";
import TrendyThisWeekSection from "@/components/home/TrendyThisWeekSection";
import StarsFromInstagramSection from "@/components/home/StarsFromInstagramSection";
import MensBrandsSection from "@/components/home/MensBrandsSection";
import WomensBrandsSection from "@/components/home/WomensBrandsSection";
import KidsBrandsSection from "@/components/home/KidsBrandsSection";
import BeautyBrandsSection from "@/components/home/BeautyBrandsSection";
import FootwearBrandsSection from "@/components/home/FootwearBrandsSection";
import AccessoriesBrandsSection from "@/components/home/AccessoriesBrandsSection";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const carouselImages = [{
    id: "1",
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    title: "Summer Edit 2025",
    subtitle: "Big collection 40% off"
  }, {
    id: "2",
    url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800",
    title: "Fashion Week Special",
    subtitle: "Exclusive Designer Wear"
  }];

  // Shop by Style categories for home page
  const shopByStyleCategories = [
    {
      id: "style-1",
      name: "Casual",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100",
      link: "/casual"
    },
    {
      id: "style-2", 
      name: "Formal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      link: "/formal"
    },
    {
      id: "style-3",
      name: "Ethnic",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=100",
      link: "/ethnic"
    },
    {
      id: "style-4",
      name: "Sports",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d2d5f?w=100",
      link: "/sports"
    },
    {
      id: "style-5",
      name: "Party",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100",
      link: "/party"
    },
    {
      id: "style-6",
      name: "Vintage",
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=100",
      link: "/vintage"
    }
  ];

  // Promotional banners data
  const promoBanners = [{
    id: "pb-1",
    title: "Mega Sale Weekend",
    subtitle: "Up to 70% off on everything",
    buttonText: "Shop Now",
    buttonLink: "/sale",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    backgroundColor: "#fc2682"
  }, {
    id: "pb-2",
    title: "New Collection Drop",
    subtitle: "Fresh styles for the season",
    buttonText: "Explore",
    buttonLink: "/new-arrivals",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800",
    backgroundColor: "#08a0ef"
  }, {
    id: "pb-3",
    title: "Bank Offers",
    subtitle: "Extra 15% off with HDFC cards",
    buttonText: "Check Offers",
    buttonLink: "/bank-offers",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    backgroundColor: "#f9b704"
  }];

  return (
    <Layout>
      <div className="space-y-6 bg-gray-50">
        {/* Pass categories to HeroSection */}
        <HeroSection
          carouselImages={carouselImages}
          isLoading={isLoading}
          categories={shopByStyleCategories}
        />

        {/* Shop by Style Section */}
        <RoundCategorySection categories={shopByStyleCategories} title="Shop by Style" />
        
        {/* New sections added after Shop by Style */}
        <PocketFriendlyBargainSection />
        <FeaturedBrandsSection />
        <BestsellerCategorySection />
        
        {/* New Category-Specific Brand Sections */}
        <MensBrandsSection />
        <WomensBrandsSection />
        <KidsBrandsSection />
        <BeautyBrandsSection />
        <FootwearBrandsSection />
        <AccessoriesBrandsSection />
        
        <TodaysSpecialsSection />
        <UniqueBestOfObeyyoSection />
        <BannerCarouselSection />
        <TrendyThisWeekSection />
        
        <QuickActions />
        <FlashSaleSection isLoading={isLoading} />
        
        {/* Large Promotional Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[0]} />
        </div>

        <CategoryFlashSaleSection isLoading={isLoading} />

        {/* Promotional Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[1]} />
        </div>

        <TrendingSection isLoading={isLoading} />
        <NewArrivalsSection isLoading={isLoading} />

        {/* Bank Offers Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[2]} />
        </div>

        <RecommendedSection isLoading={isLoading} />
        <ShopByBrandsSection isLoading={isLoading} />
        <BankOffersSection />
        <TopPicksSection isLoading={isLoading} />
        
        {/* Stars from Instagram - Added at the bottom */}
        <StarsFromInstagramSection />
      </div>
    </Layout>
  );
};

export default Index;
