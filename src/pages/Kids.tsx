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
import HorizontalBrandSection from "@/components/HorizontalBrandSection";
import HighlightsOfTheDaySection from "@/components/HighlightsOfTheDaySection";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BrandPromoSlider from "@/components/BrandPromoSlider";

const Kids = () => {
  const products = [
    {
      id: "k1",
      name: "Cute Cartoon T-Shirt",
      price: 399,
      originalPrice: 699,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
      brand: "KidsFun",
      isNew: true
    },
    {
      id: "k2",
      name: "Comfortable School Uniform",
      price: 899,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=400",
      brand: "SchoolWear"
    },
    {
      id: "k3",
      name: "Colorful Party Dress",
      price: 1199,
      originalPrice: 1899,
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=400",
      brand: "PartyKids",
      isTrending: true
    },
    {
      id: "k4",
      name: "Sports Sneakers",
      price: 799,
      originalPrice: 1299,
      rating: 4.4,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400",
      brand: "ActiveKids"
    }
  ];

  const carouselImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
      title: "Kids Summer Collection",
      subtitle: "Adorable and comfortable styles"
    },
    {
      id: "2", 
      url: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=800",
      title: "Back to School Sale",
      subtitle: "Everything your little ones need"
    }
  ];

  const dealProduct = {
    id: "deal-k1",
    name: "Complete School Set",
    price: 1999,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400",
    brand: "SchoolComplete",
    isNew: true
  };

  const pocketFriendlyProducts = [
    {
      id: "pf-k1",
      name: "Basic Kids Tee",
      price: 199,
      originalPrice: 399,
      rating: 4.1,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
      brand: "KidsBasic"
    },
    {
      id: "pf-k2",
      name: "Casual Shorts",
      price: 299,
      originalPrice: 599,
      rating: 4.0,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
      brand: "ComfortKids"
    },
    {
      id: "pf-k3",
      name: "Canvas Shoes",
      price: 499,
      originalPrice: 899,
      rating: 4.2,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400",
      brand: "KidsStep"
    }
  ];

  const genzPicksProducts = [
    {
      id: "gz-k1",
      name: "Trendy Hoodie",
      price: 799,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
      brand: "TrendyKids"
    },
    {
      id: "gz-k2",
      name: "Cool Sunglasses",
      price: 399,
      originalPrice: 699,
      rating: 4.3,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      brand: "CoolKids"
    }
  ];

  const topBrandsProducts = [
    {
      id: "tb-k1",
      name: "Nike Kids Sneakers",
      price: 3999,
      originalPrice: 5999,
      rating: 4.8,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400",
      brand: "Nike"
    },
    {
      id: "tb-k2",
      name: "Adidas Kids Tracksuit",
      price: 2999,
      originalPrice: 4999,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1544965503-7ad535c4ead7?w=400",
      brand: "Adidas"
    }
  ];

  const genzBrandsProducts = [
    {
      id: "gb-k1",
      name: "Trendy Kids Outfit",
      price: 1299,
      originalPrice: 2299,
      rating: 4.4,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
      brand: "KidsTrend"
    }
  ];

  const mensWardrobeProducts = [
    {
      id: "mw-k1",
      name: "Dad-Son Matching Tee",
      price: 899,
      originalPrice: 1599,
      rating: 4.7,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      brand: "FamilyMatch"
    }
  ];

  const brandsDealsProducts = [
    {
      id: "bd-k1",
      name: "Disney Character Tee",
      price: 699,
      originalPrice: 1299,
      rating: 4.8,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400",
      brand: "Disney"
    }
  ];

  const womensWardrobeProducts = [
    {
      id: "ww-k1",
      name: "Mom-Daughter Dress Set",
      price: 1899,
      originalPrice: 3299,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=400",
      brand: "FamilyStyle"
    }
  ];

  const featuredBrandsProducts = [
    {
      id: "fb-k1",
      name: "Premium Kids Watch",
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 123,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      brand: "KidsTime"
    }
  ];

  const bestBrandsProducts = [
    {
      id: "bb-k1",
      name: "Smart Kids Tracker",
      price: 3999,
      originalPrice: 5999,
      rating: 4.4,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      brand: "SafeKids"
    }
  ];

  const promoBanners = [
    {
      id: "promo-k1",
      title: "Kids Fashion Week",
      subtitle: "Up to 60% off on adorable styles",
      buttonText: "Shop Now",
      buttonLink: "/kids/sale",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
      backgroundColor: "#4A90E2"
    },
    {
      id: "promo-k2",
      title: "New Arrivals",
      subtitle: "Fresh kids collection just dropped",
      buttonText: "Explore",
      buttonLink: "/kids/new",
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=800",
      backgroundColor: "#FF9A6B"
    },
    {
      id: "promo-k3",
      title: "Brand Festival",
      subtitle: "Best kids brands, unbeatable prices",
      buttonText: "Shop Brands",
      buttonLink: "/kids/brands",
      image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
      backgroundColor: "#FF6B9D"
    },
    {
      id: "promo-k4",
      title: "Final Sale",
      subtitle: "Last chance to grab kids deals",
      buttonText: "Grab Deals",
      buttonLink: "/kids/final-sale",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
      backgroundColor: "#4A90E2"
    }
  ];

  const categories = [
    {
      id: "c1",
      name: "Boys",
      image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=100",
      link: "/kids/boys"
    },
    {
      id: "c2",
      name: "Girls",
      image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=100",
      link: "/kids/girls"
    },
    {
      id: "c3",
      name: "School",
      image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=100",
      link: "/kids/school"
    },
    {
      id: "c4",
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=100",
      link: "/kids/shoes"
    },
    {
      id: "c5",
      name: "Toys",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100",
      link: "/kids/toys"
    },
    {
      id: "c6",
      name: "Baby",
      image: "https://images.unsplash.com/photo-1544965503-7ad535c4ead7?w=100",
      link: "/kids/baby"
    }
  ];

  const subcategories = [
    { id: "s1", name: "Newborn", image: "https://images.unsplash.com/photo-1544965503-7ad535c4ead7?w=80", link: "/kids/newborn" },
    { id: "s2", name: "Toddler", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=80", link: "/kids/toddler" },
    { id: "s3", name: "School Age", image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=80", link: "/kids/school-age" },
    { id: "s4", name: "Teen", image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=80", link: "/kids/teen" },
    { id: "s5", name: "Party Wear", image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=80", link: "/kids/party" },
    { id: "s6", name: "Casual Wear", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=80", link: "/kids/casual" },
    { id: "s7", name: "Footwear", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=80", link: "/kids/footwear" },
    { id: "s8", name: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80", link: "/kids/accessories" }
  ];

  const tabs = [
    { name: "All", value: "all", products: [] },
    { name: "Men", value: "men", products: [] },
    { name: "Women", value: "women", products: [] },
    { name: "Kids", value: "kids", products: [] }
  ];

  // ----- Brand Data -----
  // Highlights stays the same!
  const highlightsProducts = products.slice(0, 3);

  // EXTRACT promo image for each brand.
  // We'll use distinct images--falling back to the logo if needed.
  // You may update/augment your brand image URLs/fields later as you wish.
  const featuredBrandsPromo = [
    { id: "b1", name: "Disney", logo: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=100", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400", discount: "Up to 50% OFF", link: "/brands/disney" },
    { id: "b2", name: "KidsTime", logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400", discount: "Up to 40% OFF", link: "/brands/kidstime" }
  ];
  const popularBrandsPromo = [
    { id: "pb1", name: "Nike Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400", link: "/brands/nikekids" },
    { id: "pb2", name: "PartyKids", logo: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=100", image: "https://images.unsplash.com/photo-1518917439142-deacd78191de?w=400", link: "/brands/partykids" }
  ];
  const sponsoredBrandsPromo = [
    { id: "sb1", name: "H&M Kids", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", image: "https://images.unsplash.com/photo-1544965503-7ad535c4ead7?w=400", link: "/brands/hmkids" }
  ];

  // ----- Add this block before it is used in JSX -----
  const filterCategories = ["All", "Boys", "Girls", "Shoes", "Toys", "Accessories"];

  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 4);

  return (
    <Layout>
      <div className="space-y-2 bg-gray-50">
        {/* Fashion Carousel Header */}
        <FashionCarousel 
          section="kids" 
          title="Kids Fashion" 
          subtitle="Adorable and comfortable clothing for your little ones" 
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
              <h2 className="text-base font-semibold text-gray-800">Shop by Age</h2>
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
            <h2 className="text-lg font-bold text-gray-800">🎯 Best Brands</h2>
            <Button variant="outline" size="sm" className="text-xs border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={bestBrandsProducts} />
        </section>

        {/* Final Promo Banner */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[3]} />
        </section>

        {/* Highlights of the Day */}
        <HighlightsOfTheDaySection products={highlightsProducts} />

        {/* Featured Brands (NEW STYLE) */}
        <BrandPromoSlider title="Featured Brands" brands={featuredBrandsPromo} labelText="FEATURED" />
        {/* Popular Brands */}
        <BrandPromoSlider title="Popular Brands" brands={popularBrandsPromo} labelText="POPULAR" />
        {/* Sponsored Brands */}
        <BrandPromoSlider title="Sponsored Brands" brands={sponsoredBrandsPromo} labelText="SPONSORED" />

        {/* Filters */}
        <div className="px-3">
          <div className="flex flex-wrap items-center gap-3 py-3 border-t border-gray-200 bg-white rounded-lg">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {filterCategories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap rounded-full text-xs px-3 py-1.5 ${
                    category === "All" 
                      ? "bg-[#4A90E2] hover:bg-[#4A90E2]/90" 
                      : "border-gray-300 hover:border-[#4A90E2] hover:text-[#4A90E2]"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="ml-auto">
              <Select>
                <SelectTrigger className="w-40 rounded-full text-xs">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
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

export default Kids;
