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

const Men = () => {
  const products = [
    {
      id: "m1",
      name: "Classic Cotton T-Shirt",
      price: 599,
      originalPrice: 999,
      rating: 4.5,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "StyleCo",
      isNew: true
    },
    {
      id: "m2",
      name: "Slim Fit Denim Jeans",
      price: 1299,
      originalPrice: 2199,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      brand: "DenimCo"
    },
    {
      id: "m3",
      name: "Formal Dress Shirt",
      price: 899,
      originalPrice: 1499,
      rating: 4.7,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1620001390628-11f5a2f0ab91?w=400",
      brand: "FormalWear"
    },
    {
      id: "m4",
      name: "Sports Running Shoes",
      price: 2499,
      originalPrice: 3999,
      rating: 4.8,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "SportMax",
      isTrending: true
    }
  ];

  const carouselImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      title: "Men's Summer Collection",
      subtitle: "Discover the latest trends"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      title: "Formal Wear Sale",
      subtitle: "Up to 50% off on suits & shirts"
    }
  ];

  const dealProduct = {
    id: "deal-m1",
    name: "Premium Leather Jacket",
    price: 2999,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    brand: "LeatherCraft",
    isNew: true
  };

  const pocketFriendlyProducts = [
    {
      id: "pf-m1",
      name: "Basic Cotton Tee",
      price: 299,
      originalPrice: 599,
      rating: 4.2,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "BasicWear"
    },
    {
      id: "pf-m2",
      name: "Casual Shorts",
      price: 499,
      originalPrice: 899,
      rating: 4.0,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      brand: "CasualCo"
    },
    {
      id: "pf-m3",
      name: "Canvas Sneakers",
      price: 699,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      brand: "SneakerHub"
    }
  ];

  const genzPicksProducts = [
    {
      id: "gz-m1",
      name: "Oversized Graphic Hoodie",
      price: 1299,
      originalPrice: 2499,
      rating: 4.8,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      brand: "UrbanVibe",
      isTrending: true
    },
    {
      id: "gz-m2",
      name: "Distressed Denim Jacket",
      price: 1599,
      originalPrice: 2999,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      brand: "RebelWear"
    }
  ];

  const topBrandsProducts = [
    {
      id: "tb-m1",
      name: "Nike Air Max Sneakers",
      price: 8999,
      originalPrice: 12999,
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "Nike"
    },
    {
      id: "tb-m2",
      name: "Adidas Track Jacket",
      price: 3999,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
      brand: "Adidas"
    }
  ];

  const genzBrandsProducts = [
    {
      id: "gb-m1",
      name: "Supreme Style Hoodie",
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      brand: "StreetCore"
    }
  ];

  const mensWardrobeProducts = [
    {
      id: "mw-m1",
      name: "Formal White Shirt",
      price: 1299,
      originalPrice: 2499,
      rating: 4.6,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
      brand: "ClassicMen"
    }
  ];

  const brandsDealsProducts = [
    {
      id: "bd-m1",
      name: "Ray-Ban Sunglasses",
      price: 7999,
      originalPrice: 12999,
      rating: 4.8,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      brand: "Ray-Ban"
    }
  ];

  const womensWardrobeProducts = [
    {
      id: "ww-m1",
      name: "Gift for Her - Silk Scarf",
      price: 899,
      originalPrice: 1599,
      rating: 4.5,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
      brand: "SilkTouch"
    }
  ];

  const featuredBrandsProducts = [
    {
      id: "fb-m1",
      name: "Premium Watch",
      price: 15999,
      originalPrice: 24999,
      rating: 4.9,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      brand: "TimeMaster"
    }
  ];

  const bestBrandsProducts = [
    {
      id: "bb-m1",
      name: "Smart Fitness Tracker",
      price: 8999,
      originalPrice: 12999,
      rating: 4.6,
      reviews: 789,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      brand: "FitTech"
    }
  ];

  const promoBanners = [
    {
      id: "promo-m1",
      title: "Men's Fashion Week",
      subtitle: "Up to 70% off on trending styles",
      buttonText: "Shop Now",
      buttonLink: "/men/sale",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      backgroundColor: "#4A90E2"
    },
    {
      id: "promo-m2",
      title: "New Arrivals",
      subtitle: "Fresh men's collection just dropped",
      buttonText: "Explore",
      buttonLink: "/men/new",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      backgroundColor: "#FF9A6B"
    },
    {
      id: "promo-m3",
      title: "Brand Festival",
      subtitle: "Best men's brands, unbeatable prices",
      buttonText: "Shop Brands",
      buttonLink: "/men/brands",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d2d5f?w=800",
      backgroundColor: "#FF6B9D"
    },
    {
      id: "promo-m4",
      title: "Final Sale",
      subtitle: "Last chance to grab men's deals",
      buttonText: "Grab Deals",
      buttonLink: "/men/final-sale",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      backgroundColor: "#4A90E2"
    }
  ];

  const categories = [
    {
      id: "c1",
      name: "T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100",
      link: "/men/tshirts"
    },
    {
      id: "c2",
      name: "Shirts",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100",
      link: "/men/shirts"
    },
    {
      id: "c3",
      name: "Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100",
      link: "/men/jeans"
    },
    {
      id: "c4",
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
      link: "/men/shoes"
    },
    {
      id: "c5",
      name: "Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100",
      link: "/men/jackets"
    },
    {
      id: "c6",
      name: "Watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
      link: "/men/watches"
    }
  ];

  const subcategories = [
    { id: "s1", name: "Casual Wear", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", link: "/men/casual" },
    { id: "s2", name: "Formal Wear", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80", link: "/men/formal" },
    { id: "s3", name: "Sports Wear", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80", link: "/men/sports" },
    { id: "s4", name: "Party Wear", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80", link: "/men/party" },
    { id: "s5", name: "Winter Wear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80", link: "/men/winter" },
    { id: "s6", name: "Summer Collection", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=80", link: "/men/summer" },
    { id: "s7", name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80", link: "/men/footwear" },
    { id: "s8", name: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80", link: "/men/accessories" }
  ];

  const tabs = [
    { name: "All", value: "all", products: [] },
    { name: "Men", value: "men", products: [] },
    { name: "Women", value: "women", products: [] },
    { name: "Kids", value: "kids", products: [] }
  ];

  const filterCategories = ["All", "T-Shirts", "Shirts", "Jeans", "Shoes", "Accessories"];
  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 6);

  const brandsFlexData = [
    { id: "bf1", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", discount: "Up to 60% OFF" },
    { id: "bf2", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", discount: "Up to 50% OFF" },
    { id: "bf3", name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg", discount: "Up to 45% OFF" },
    { id: "bf4", name: "Levi's", logo: "https://logos-world.net/wp-content/uploads/2020/04/Levis-Logo.png", discount: "Up to 40% OFF" },
    { id: "bf5", name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", discount: "Up to 35% OFF" },
    { id: "bf6", name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Zara_Logo.svg", discount: "Up to 30% OFF" },
    { id: "bf7", name: "Tommy Hilfiger", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Tommy_Hilfiger_logo.svg", discount: "Up to 45% OFF" },
    { id: "bf8", name: "Calvin Klein", logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Calvin_klein_logo.svg", discount: "Up to 40% OFF" },
    { id: "bf9", name: "Lacoste", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Lacoste_logo.svg", discount: "Up to 35% OFF" },
    { id: "bf10", name: "Ralph Lauren", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Polo_Ralph_Lauren_logo.svg", discount: "Up to 50% OFF" },
    { id: "bf11", name: "Hugo Boss", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hugo_Boss_logo.svg", discount: "Up to 45% OFF" },
    { id: "bf12", name: "Armani", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Giorgio_Armani_logo.svg", discount: "Up to 40% OFF" },
    { id: "bf13", name: "Diesel", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Diesel_logo.svg", discount: "Up to 35% OFF" },
    { id: "bf14", name: "Guess", logo: "https://upload.wikimedia.org/wikipedia/commons/6/68/Guess_logo.svg", discount: "Up to 30% OFF" },
    { id: "bf15", name: "Versace", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Versace_logo.svg", discount: "Up to 50% OFF" },
    { id: "bf16", name: "Burberry", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Burberry_logo.svg", discount: "Up to 45% OFF" }
  ];

  const tshirtCategories = [
    { id: "t1", name: "Basic Tees", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", link: "/men/basic-tees" },
    { id: "t2", name: "Graphic Tees", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=80", link: "/men/graphic-tees" },
    { id: "t3", name: "Polo Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80", link: "/men/polo-shirts" },
    { id: "t4", name: "Sports Tees", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80", link: "/men/sports-tees" },
    { id: "t5", name: "V-Neck", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", link: "/men/v-neck" },
    { id: "t6", name: "Henley", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80", link: "/men/henley" }
  ];

  const couponsData = [
    {
      id: "c1",
      code: "SAVE50",
      title: "Flat ₹500 Off",
      description: "On orders above ₹2000",
      discount: "₹500 OFF",
      validUntil: "31 Dec 2024"
    },
    {
      id: "c2",
      code: "FIRST30",
      title: "First Order Discount",
      description: "Extra 30% off for new users",
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
    { id: "e1", name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", discount: "Up to 60% OFF", link: "/men/jeans" },
    { id: "e2", name: "Watches", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", discount: "Up to 50% OFF", link: "/men/watches" },
    { id: "e3", name: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", discount: "Up to 40% OFF", link: "/men/accessories" },
    { id: "e4", name: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", discount: "Up to 70% OFF", link: "/men/shoes" }
  ];

  const beautyProducts = [
    {
      id: "mb-1",
      name: "Men's Grooming Kit",
      price: 899,
      originalPrice: 1499,
      rating: 4.3,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300",
      brand: "GroomMax"
    },
    {
      id: "mb-2",
      name: "Beard Oil Set",
      price: 599,
      originalPrice: 999,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300",
      brand: "BeardCare"
    }
  ];

  const footwearProducts = [
    {
      id: "mf-1",
      name: "Men's Sports Shoes",
      price: 2499,
      originalPrice: 3999,
      rating: 4.4,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      brand: "SportMax"
    },
    {
      id: "mf-2",
      name: "Casual Sneakers",
      price: 1899,
      originalPrice: 2999,
      rating: 4.2,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      brand: "StreetWear"
    }
  ];

  const watchesProducts = [
    {
      id: "mw-1",
      name: "Men's Digital Watch",
      price: 1299,
      originalPrice: 1999,
      rating: 4.1,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      brand: "TimeZone"
    },
    {
      id: "mw-2",
      name: "Analog Watch",
      price: 1599,
      originalPrice: 2499,
      rating: 4.3,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300",
      brand: "ClassicTime"
    }
  ];

  const perfumeProducts = [
    {
      id: "mp-1",
      name: "Men's Cologne",
      price: 799,
      originalPrice: 1299,
      rating: 4.2,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
      brand: "FragranceMax"
    },
    {
      id: "mp-2",
      name: "Premium Perfume",
      price: 1199,
      originalPrice: 1899,
      rating: 4.4,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
      brand: "LuxeScent"
    }
  ];

  return (
    <Layout>
      <div className="space-y-2 bg-gray-50">
        <FashionCarousel 
          section="men" 
          title="Men's Fashion" 
          subtitle="Discover the latest trends in men's clothing" 
        />

        <TabSection tabs={tabs} />

        <RoundCategorySection categories={categories} />

        <div className="px-3">
          <ImageCarousel images={carouselImages} />
        </div>

        <section className="px-3">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-800">Shop by Style</h2>
              <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
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

        <section className="px-3">
          <PromoBanner banner={promoBanners[0]} />
        </section>

        <BrandsFlexSection brands={brandsFlexData} />

        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🏆 Biggest Brands On Offers</h2>
            <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={topBrandsProducts} />
        </section>

        <TShirtCategoriesSection categories={tshirtCategories} />

        <OffersAndCouponsSection coupons={couponsData} />

        <BiggestOfferSection products={biggestOfferProducts} />

        <section className="px-3">
          <PromoBanner banner={promoBanners[1]} />
        </section>

        <EverythingInOfferSection categories={everythingInOfferCategories} />

        <section className="px-3">
          <PromoBanner banner={promoBanners[2]} />
        </section>

        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🧴 Men's Grooming & Beauty</h2>
            <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={beautyProducts} />
        </section>

        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">👟 Men's Footwear</h2>
            <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={footwearProducts} />
        </section>

        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">⌚ Men's Watches</h2>
            <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={watchesProducts} />
        </section>

        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🌟 Men's Fragrances</h2>
            <Button variant="outline" size="sm" className="text-xs border-obeyyo-red text-obeyyo-red hover:bg-obeyyo-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={perfumeProducts} />
        </section>

        <section className="px-3">
          <DealOfTheDay product={dealProduct} endTime={dealEndTime} />
        </section>

        <div className="px-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Men;
