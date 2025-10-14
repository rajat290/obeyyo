import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ImageCarousel from "@/components/ImageCarousel";
import PromoBanner from "@/components/PromoBanner";
import ProductSlider from "@/components/ProductSlider";
import PocketFriendlySection from "@/components/PocketFriendlySection";
import DealOfTheDay from "@/components/DealOfTheDay";
import TabSection from "@/components/TabSection";
import RoundCategorySection from "@/components/RoundCategorySection";
import FashionCarousel from "@/components/FashionCarousel";
import BrandsFlexSection from "@/components/BrandsFlexSection";
import TShirtCategoriesSection from "@/components/TShirtCategoriesSection";
import OffersAndCouponsSection from "@/components/OffersAndCouponsSection";
import BiggestOfferSection from "@/components/BiggestOfferSection";
import EverythingInOfferSection from "@/components/EverythingInOfferSection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Women = () => {
  const products = [
    {
      id: "w1",
      name: "Floral Print Dress",
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      brand: "Fashionista",
      isNew: true
    },
    {
      id: "w2",
      name: "Elegant Evening Gown",
      price: 5999,
      originalPrice: 8999,
      rating: 4.8,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      brand: "GlamourStyle",
      isTrending: true
    },
    {
      id: "w3",
      name: "Casual Summer Top",
      price: 999,
      originalPrice: 1499,
      rating: 4.2,
      reviews: 150,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      brand: "DailyWear"
    },
    {
      id: "w4",
      name: "Classic Denim Jeans",
      price: 1999,
      originalPrice: 2999,
      rating: 4.6,
      reviews: 90,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      brand: "DenimCo"
    }
  ];

  const carouselImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
      title: "Women's Fashion Collection",
      subtitle: "Discover the latest trends in women's fashion"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
      title: "Summer Sale",
      subtitle: "Up to 60% off on women's clothing"
    }
  ];

  const dealProduct = {
    id: "deal-w1",
    name: "Designer Handbag",
    price: 3999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    brand: "LuxeFashion",
    isNew: true
  };

  const pocketFriendlyProducts = [
    {
      id: "pf-w1",
      name: "Basic Cotton Top",
      price: 399,
      originalPrice: 799,
      rating: 4.1,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      brand: "CasualWear"
    },
    {
      id: "pf-w2",
      name: "Comfortable Leggings",
      price: 599,
      originalPrice: 999,
      rating: 4.3,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1506629905607-d4d7d1b52ba8?w=400",
      brand: "ComfortZone"
    },
    {
      id: "pf-w3",
      name: "Canvas Sneakers",
      price: 899,
      originalPrice: 1599,
      rating: 4.2,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      brand: "SneakerHub"
    }
  ];

  const genzPicksProducts = [
    {
      id: "gz-w1",
      name: "Crop Top Hoodie",
      price: 1599,
      originalPrice: 2999,
      rating: 4.7,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      brand: "UrbanVibe",
      isTrending: true
    },
    {
      id: "gz-w2",
      name: "High-Waist Jeans",
      price: 1899,
      originalPrice: 3499,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      brand: "TrendyDenim"
    }
  ];

  const topBrandsProducts = [
    {
      id: "tb-w1",
      name: "Nike Women's Sneakers",
      price: 7999,
      originalPrice: 11999,
      rating: 4.8,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "Nike"
    },
    {
      id: "tb-w2",
      name: "Zara Blazer",
      price: 4999,
      originalPrice: 7999,
      rating: 4.7,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      brand: "Zara"
    }
  ];

  const genzBrandsProducts = [
    {
      id: "gb-w1",
      name: "Streetwear Oversized Tee",
      price: 1299,
      originalPrice: 2499,
      rating: 4.5,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "StreetCore"
    }
  ];

  const mensWardrobeProducts = [
    {
      id: "mw-w1",
      name: "Couple's Matching Hoodie",
      price: 1899,
      originalPrice: 3499,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      brand: "CoupleStyle"
    }
  ];

  const brandsDealsProducts = [
    {
      id: "bd-w1",
      name: "Ray-Ban Women's Sunglasses",
      price: 8999,
      originalPrice: 14999,
      rating: 4.8,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      brand: "Ray-Ban"
    }
  ];

  const womensWardrobeProducts = [
    {
      id: "ww-w1",
      name: "Professional Dress",
      price: 2499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      brand: "WorkWear"
    }
  ];

  const featuredBrandsProducts = [
    {
      id: "fb-w1",
      name: "Premium Watch",
      price: 12999,
      originalPrice: 19999,
      rating: 4.9,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
      brand: "TimeLuxe"
    }
  ];

  const bestBrandsProducts = [
    {
      id: "bb-w1",
      name: "Fitness Tracker",
      price: 6999,
      originalPrice: 9999,
      rating: 4.6,
      reviews: 890,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      brand: "FitTech"
    }
  ];

  const promoBanners = [
    {
      id: "promo-w1",
      title: "Women's Fashion Week",
      subtitle: "Up to 70% off on trending styles",
      buttonText: "Shop Now",
      buttonLink: "/women/sale",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
      backgroundColor: "#4A90E2"
    },
    {
      id: "promo-w2",
      title: "New Arrivals",
      subtitle: "Fresh women's collection just dropped",
      buttonText: "Explore",
      buttonLink: "/women/new",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800",
      backgroundColor: "#FF9A6B"
    },
    {
      id: "promo-w3",
      title: "Brand Festival",
      subtitle: "Best women's brands, unbeatable prices",
      buttonText: "Shop Brands",
      buttonLink: "/women/brands",
      image: "https://images.unsplash.com/photo-1506629905607-d4d7d1b52ba8?w=800",
      backgroundColor: "#FF6B9D"
    },
    {
      id: "promo-w4",
      title: "Final Sale",
      subtitle: "Last chance to grab women's deals",
      buttonText: "Grab Deals",
      buttonLink: "/women/final-sale",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
      backgroundColor: "#4A90E2"
    }
  ];

  const categories = [
    {
      id: "c1",
      name: "Dresses",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100",
      link: "/women/dresses"
    },
    {
      id: "c2",
      name: "Tops",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100",
      link: "/women/tops"
    },
    {
      id: "c3",
      name: "Bottoms",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100",
      link: "/women/bottoms"
    },
    {
      id: "c4",
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
      link: "/women/shoes"
    },
    {
      id: "c5",
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100",
      link: "/women/accessories"
    },
    {
      id: "c6",
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100",
      link: "/women/beauty"
    }
  ];

  const subcategories = [
    { id: "s1", name: "Casual Wear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/women/casual" },
    { id: "s2", name: "Formal Wear", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80", link: "/women/formal" },
    { id: "s3", name: "Sports Wear", image: "https://images.unsplash.com/photo-1506629905607-d4d7d1b52ba8?w=80", link: "/women/sports" },
    { id: "s4", name: "Party Wear", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80", link: "/women/party" },
    { id: "s5", name: "Winter Wear", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80", link: "/women/winter" },
    { id: "s6", name: "Summer Collection", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/women/summer" },
    { id: "s7", name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80", link: "/women/footwear" },
    { id: "s8", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80", link: "/women/beauty" }
  ];

  const tabs = [
    { name: "All", value: "all", products: [] },
    { name: "Men", value: "men", products: [] },
    { name: "Women", value: "women", products: [] },
    { name: "Kids", value: "kids", products: [] }
  ];

  const filterCategories = ["All", "Dresses", "Tops", "Bottoms", "Shoes", "Accessories", "Beauty"];
  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 6);

  const brandsFlexData = [
    { id: "bf1", name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Zara_Logo.svg", discount: "Up to 60% OFF" },
    { id: "bf2", name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", discount: "Up to 50% OFF" },
    { id: "bf3", name: "Forever 21", logo: "https://logos-world.net/wp-content/uploads/2020/04/Forever-21-Logo.png", discount: "Up to 45% OFF" },
    { id: "bf4", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", discount: "Up to 40% OFF" },
    { id: "bf5", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", discount: "Up to 35% OFF" },
    { id: "bf6", name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg", discount: "Up to 30% OFF" }
  ];

  const tshirtCategories = [
    { id: "t1", name: "Basic Tops", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/women/basic-tops" },
    { id: "t2", name: "Graphic Tees", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", link: "/women/graphic-tees" },
    { id: "t3", name: "Blouses", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80", link: "/women/blouses" },
    { id: "t4", name: "Tank Tops", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/women/tank-tops" },
    { id: "t5", name: "Crop Tops", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/women/crop-tops" },
    { id: "t6", name: "Off-Shoulder", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=80", link: "/women/off-shoulder" }
  ];

  const couponsData = [
    {
      id: "c1",
      code: "WOMEN50",
      title: "Flat ₹500 Off",
      description: "On women's fashion above ₹2000",
      discount: "₹500 OFF",
      validUntil: "31 Dec 2024"
    },
    {
      id: "c2",
      code: "NEWLADY30",
      title: "First Order Discount",
      description: "Extra 30% off for new female users",
      discount: "30% OFF",
      validUntil: "31 Dec 2024"
    }
  ];

  const biggestOfferProducts = [
    ...products.slice(0, 3),
    ...topBrandsProducts.slice(0, 3),
    ...genzPicksProducts.slice(0, 3)
  ];

  const everythingInOfferCategories = [
    { id: "e1", name: "Dresses", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", discount: "Up to 60% OFF", link: "/women/dresses" },
    { id: "e2", name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", discount: "Up to 50% OFF", link: "/women/shoes" },
    { id: "e3", name: "Accessories", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400", discount: "Up to 40% OFF", link: "/women/accessories" },
    { id: "e4", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", discount: "Up to 70% OFF", link: "/women/beauty" }
  ];

  const beautyProducts = [
    {
      id: "wb-1",
      name: "Luxury Skincare Set",
      price: 3499,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 75,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
      brand: "BeautyEssentials"
    },
    {
      id: "wb-2",
      name: "Makeup Palette",
      price: 1499,
      originalPrice: 2499,
      rating: 4.4,
      reviews: 110,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
      brand: "ColorGlam"
    }
  ];

  const footwearProducts = [
    {
      id: "wf-1",
      name: "High Heel Sandals",
      price: 2799,
      originalPrice: 4499,
      rating: 4.6,
      reviews: 60,
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300",
      brand: "ElegantSteps"
    },
    {
      id: "wf-2",
      name: "Comfortable Sneakers",
      price: 1799,
      originalPrice: 2799,
      rating: 4.3,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      brand: "ActiveFoot"
    }
  ];

  const watchesProducts = [
    {
      id: "ww-1",
      name: "Designer Watch",
      price: 4499,
      originalPrice: 6999,
      rating: 4.8,
      reviews: 50,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300",
      brand: "TimeLuxe"
    },
    {
      id: "ww-2",
      name: "Smart Watch",
      price: 3299,
      originalPrice: 5299,
      rating: 4.5,
      reviews: 80,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      brand: "TechTime"
    }
  ];

  const perfumeProducts = [
    {
      id: "wp-1",
      name: "Exclusive Perfume",
      price: 1999,
      originalPrice: 3499,
      rating: 4.9,
      reviews: 40,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
      brand: "ScentDelight"
    },
    {
      id: "wp-2",
      name: "Floral Scent",
      price: 1299,
      originalPrice: 2299,
      rating: 4.6,
      reviews: 70,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
      brand: "AromaEssence"
    }
  ];

  return (
    <Layout>
      <div className="space-y-2 bg-gray-50">
        {/* Fashion Carousel Header */}
        <FashionCarousel 
          section="women" 
          title="Women's Fashion" 
          subtitle="Discover the latest trends in women's fashion" 
        />

        {/* Tabs Section */}
        <TabSection tabs={tabs} />

        {/* Shop by Category */}
        <RoundCategorySection categories={categories} />

        {/* Hero Carousel */}
        <div className="px-3">
          <ImageCarousel images={carouselImages} />
        </div>

        {/* Subcategory Section */}
        <section className="px-3">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-800">Shop by Style</h2>
              <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {subcategories.map((subcategory) => (
                <div key={subcategory.id} className="text-center">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1">
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-600 leading-tight">{subcategory.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deal of the Day */}
        <section className="px-3">
          <DealOfTheDay product={dealProduct} endTime={dealEndTime} />
        </section>

        {/* Pocket Friendly Section */}
        <PocketFriendlySection products={pocketFriendlyProducts} />

        {/* Promo Banner 1 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[0]} />
        </section>

        {/* GenZ Picks */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🔥 GenZ Picks</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={genzPicksProducts} />
        </section>

        {/* Top Brands on Offer */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🏆 Top Brands on Offer</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={topBrandsProducts} />
        </section>

        {/* Promo Banner 2 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[1]} />
        </section>

        {/* GenZ Brands on Offer */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">✨ GenZ Brands on Offer</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={genzBrandsProducts} />
        </section>

        {/* Deals on Men's Wardrobe */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">👔 Deals on Men's Wardrobe</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={mensWardrobeProducts} />
        </section>

        {/* Promo Banner 3 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[2]} />
        </section>

        {/* Brands Deal You Can't Miss */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">💎 Brands Deal You Can't Miss</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={brandsDealsProducts} />
        </section>

        {/* Deals on Women's Wardrobe */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">👗 Deals on Women's Wardrobe</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={womensWardrobeProducts} />
        </section>

        {/* Promo Banner 4 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[3]} />
        </section>

        {/* Featured Brands */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">⭐ Featured Brands</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={featuredBrandsProducts} />
        </section>

        {/* Best Brands */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🌟 Best Brands</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={bestBrandsProducts} />
        </section>

        {/* Brands Flex Section */}
        <BrandsFlexSection brands={brandsFlexData} />

        {/* T-Shirt Categories */}
        <TShirtCategoriesSection categories={tshirtCategories} />

        {/* Offers and Coupons */}
        <OffersAndCouponsSection coupons={couponsData} />

        {/* Biggest Offer Section */}
        <BiggestOfferSection 
          products={biggestOfferProducts}
        />

        {/* Everything in Offer */}
        <EverythingInOfferSection categories={everythingInOfferCategories} />

        {/* Shop by Section */}
        <section className="px-3">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Shop By Category</h2>
            
            {/* Beauty Products */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 text-gray-700">💄 Beauty</h3>
              <ProductSlider title="" products={beautyProducts} />
            </div>

            {/* Footwear Products */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 text-gray-700">👠 Footwear</h3>
              <ProductSlider title="" products={footwearProducts} />
            </div>

            {/* Watches Products */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 text-gray-700">⌚ Watches</h3>
              <ProductSlider title="" products={watchesProducts} />
            </div>

            {/* Perfume Products */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 text-gray-700">🌸 Perfumes</h3>
              <ProductSlider title="" products={perfumeProducts} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Women;
