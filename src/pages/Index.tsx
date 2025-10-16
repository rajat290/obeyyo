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

// Import services
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { Product, Category } from '../types';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Load homepage data
    loadHomePageData();
  }, []);

  const loadHomePageData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');

      // Load all data in parallel
      const [
        featuredResponse, 
        trendingResponse, 
        newArrivalsResponse, 
        categoriesResponse,
        flashSaleResponse
      ] = await Promise.all([
        productService.getFeaturedProducts(12),
        productService.getTrendingProducts(12),
        productService.getNewArrivals(12),
        categoryService.getCategories(),
        productService.getFlashSaleProducts().catch(() => ({ data: { products: [] } })) // Handle if flash sale not available
      ]);

      setFeaturedProducts(featuredResponse.data?.products || []);
      setTrendingProducts(trendingResponse.data?.products || []);
      setNewArrivals(newArrivalsResponse.data?.products || []);
      setCategories(categoriesResponse.data?.categories || []);
      setFlashSaleProducts(flashSaleResponse.data?.products || []);

    } catch (err: any) {
      setError('Failed to load homepage data. Please try again.');
      console.error('Homepage data error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert categories to your existing format
  const shopByStyleCategories = categories.slice(0, 6).map((category, index) => ({
    id: `style-${index + 1}`,
    name: category.name,
    image: category.image || `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&${index}`,
    link: `/category/${category.slug}`
  }));

  // If no categories from API, use fallback
  const fallbackCategories = [
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

  const finalCategories = shopByStyleCategories.length > 0 ? shopByStyleCategories : fallbackCategories;

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
        {/* Show error message if any */}
        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
            <button 
              onClick={loadHomePageData}
              className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Pass categories to HeroSection */}
        <HeroSection
          carouselImages={carouselImages}
          isLoading={isLoading}
          categories={finalCategories}
        />

        {/* Shop by Style Section */}
        <RoundCategorySection categories={finalCategories} title="Shop by Style" />
        
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
        
        {/* Flash Sale with dynamic products */}
        <FlashSaleSection 
          isLoading={isLoading} 
          products={flashSaleProducts}
        />
        
        {/* Large Promotional Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[0]} />
        </div>

        <CategoryFlashSaleSection isLoading={isLoading} />

        {/* Promotional Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[1]} />
        </div>

        {/* Trending with dynamic products */}
        <TrendingSection 
          isLoading={isLoading} 
          products={trendingProducts}
        />
        
        {/* New Arrivals with dynamic products */}
        <NewArrivalsSection 
          isLoading={isLoading} 
          products={newArrivals}
        />

        {/* Bank Offers Banner */}
        <div className="px-4">
          <PromoBanner banner={promoBanners[2]} />
        </div>

        <RecommendedSection isLoading={isLoading} />
        <ShopByBrandsSection isLoading={isLoading} />
        <BankOffersSection />
        
        {/* Top Picks with dynamic products */}
        <TopPicksSection 
          isLoading={isLoading} 
          products={featuredProducts}
        />
        
        {/* Stars from Instagram - Added at the bottom */}
        <StarsFromInstagramSection />
      </div>
    </Layout>
  );
};

export default Index;