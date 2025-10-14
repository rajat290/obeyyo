
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

const Footwear = () => {
  const products = [
    {
      id: "f1",
      name: "Running Sports Shoes",
      price: 2499,
      originalPrice: 3999,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "SportMax",
      isNew: true
    },
    {
      id: "f2",
      name: "Casual Canvas Sneakers",
      price: 1299,
      originalPrice: 1999,
      rating: 4.3,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      brand: "CasualStep"
    },
    {
      id: "f3",
      name: "Formal Leather Shoes",
      price: 3499,
      originalPrice: 5999,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
      brand: "ClassicFeet"
    },
    {
      id: "f4",
      name: "Women's Heels",
      price: 1999,
      originalPrice: 3499,
      rating: 4.4,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      brand: "ElegantStep",
      isTrending: true
    }
  ];

  const carouselImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      title: "Footwear Sale Up to 60% OFF",
      subtitle: "Step into style with premium footwear"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      title: "Sports & Casual Collection",
      subtitle: "Comfort meets performance"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800",
      title: "Formal & Business Shoes",
      subtitle: "Professional elegance redefined"
    }
  ];

  const categories = [
    {
      id: "c1",
      name: "Sports",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100",
      link: "/footwear/sports"
    },
    {
      id: "c2",
      name: "Casual",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100",
      link: "/footwear/casual"
    },
    {
      id: "c3",
      name: "Formal",
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=100",
      link: "/footwear/formal"
    },
    {
      id: "c4",
      name: "Heels",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100",
      link: "/footwear/heels"
    },
    {
      id: "c5",
      name: "Boots",
      image: "https://images.unsplash.com/photo-1544966503-f098d46e6aaa?w=100",
      link: "/footwear/boots"
    },
    {
      id: "c6",
      name: "Sandals",
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=100",
      link: "/footwear/sandals"
    }
  ];

  const subcategories = [
    { id: "s1", name: "Running Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80", link: "/footwear/running" },
    { id: "s2", name: "Sneakers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80", link: "/footwear/sneakers" },
    { id: "s3", name: "Oxford Shoes", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=80", link: "/footwear/oxford" },
    { id: "s4", name: "High Heels", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=80", link: "/footwear/high-heels" },
    { id: "s5", name: "Ankle Boots", image: "https://images.unsplash.com/photo-1544966503-f098d46e6aaa?w=80", link: "/footwear/ankle-boots" },
    { id: "s6", name: "Flip Flops", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=80", link: "/footwear/flip-flops" },
    { id: "s7", name: "Loafers", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=80", link: "/footwear/loafers" },
    { id: "s8", name: "Sports Sandals", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=80", link: "/footwear/sports-sandals" }
  ];

  const tabs = [
    { name: "All", value: "all", products: [] },
    { name: "Men", value: "men", products: [] },
    { name: "Women", value: "women", products: [] },
    { name: "Kids", value: "kids", products: [] },
    { name: "Beauty", value: "beauty", products: [] },
    { name: "Footwear", value: "footwear", products: [] }
  ];

  const promoBanners = [
    {
      id: "promo-f1",
      title: "Footwear Festival",
      subtitle: "Up to 70% off on branded footwear",
      buttonText: "Shop Now",
      buttonLink: "/footwear/sale",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      backgroundColor: "#08a0ef"
    },
    {
      id: "promo-f2",
      title: "Comfort Collection",
      subtitle: "All-day comfort for every step",
      buttonText: "Explore",
      buttonLink: "/footwear/comfort",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      backgroundColor: "#fb8619"
    }
  ];

  const dealProduct = {
    id: "deal-f1",
    name: "Premium Leather Boots",
    price: 3999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1544966503-f098d46e6aaa?w=400",
    brand: "LeatherCraft",
    isNew: true
  };

  const unbeatableDealsProducts = [
    {
      id: "ud-f1",
      name: "Comfortable Walking Shoes",
      price: 1499,
      originalPrice: 2999,
      rating: 4.4,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "ComfortWalk"
    },
    {
      id: "ud-f2",
      name: "Stylish High Heels",
      price: 1799,
      originalPrice: 3299,
      rating: 4.5,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      brand: "StyleHeels"
    }
  ];

  const featuredBrands = [
    { id: "fb1", name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", discount: "Up to 50% OFF", link: "/brands/nike" },
    { id: "fb2", name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", discount: "Up to 45% OFF", link: "/brands/adidas" },
    { id: "fb3", name: "Puma", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg", discount: "Up to 40% OFF", link: "/brands/puma" }
  ];

  const occasionProducts = [
    {
      id: "o-f1",
      name: "Wedding Formal Shoes",
      price: 4499,
      originalPrice: 7999,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
      brand: "WeddingStyle"
    },
    {
      id: "o-f2",
      name: "Party Heels",
      price: 2299,
      originalPrice: 3999,
      rating: 4.6,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
      brand: "PartyFeet"
    }
  ];

  const topRatedProducts = [
    {
      id: "tr-f1",
      name: "Premium Running Shoes",
      price: 5999,
      originalPrice: 9999,
      rating: 4.9,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      brand: "RunMaster"
    }
  ];

  const sponsoredProducts = [
    {
      id: "sp-f1",
      name: "Limited Edition Sneakers",
      price: 7999,
      originalPrice: 12999,
      rating: 4.8,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      brand: "Limited"
    }
  ];

  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 12);

  const filterCategories = ["All", "Sports", "Casual", "Formal", "Heels", "Boots", "Sandals"];

  return (
    <Layout>
      <div className="space-y-2 bg-gray-50">
        {/* Fashion Carousel Header */}
        <FashionCarousel 
          section="footwear" 
          title="Footwear Collection" 
          subtitle="Step into style with our premium footwear range" 
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
              <Button variant="outline" size="sm" className="text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg px-3 py-1.5">
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

        {/* Unbeatable Deals */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🔥 Unbeatable Deals</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={unbeatableDealsProducts} />
        </section>

        {/* Featured Brands */}
        <HorizontalBrandSection title="Featured Brands" brands={featuredBrands} labelText="FEATURED" labelColor="bg-brand-blue/10 text-brand-blue" />

        {/* Promo Banner 1 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[0]} />
        </section>

        {/* Shop by Occasion */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">👔 Shop by Occasion</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={occasionProducts} />
        </section>

        {/* Promo Banner 2 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[1]} />
        </section>

        {/* Top Rated Brands */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">⭐ Top Rated Brands</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={topRatedProducts} />
        </section>

        {/* Sponsored Products */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">💎 Sponsored Products</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={sponsoredProducts} />
        </section>

        {/* Highlights of the Day */}
        <HighlightsOfTheDaySection products={products.slice(0, 3)} />

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
                      ? "bg-brand-blue hover:bg-brand-blue/90" 
                      : "border-gray-300 hover:border-brand-blue hover:text-brand-blue"
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

export default Footwear;
