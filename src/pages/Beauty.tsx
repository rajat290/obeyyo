
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

const Beauty = () => {
  const products = [
    {
      id: "b1",
      name: "Hydrating Face Serum",
      price: 899,
      originalPrice: 1299,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      brand: "GlowUp",
      isNew: true
    },
    {
      id: "b2",
      name: "Matte Liquid Lipstick",
      price: 599,
      originalPrice: 899,
      rating: 4.4,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
      brand: "ColorPop"
    },
    {
      id: "b3",
      name: "Anti-Aging Night Cream",
      price: 1299,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
      brand: "YouthGlow"
    },
    {
      id: "b4",
      name: "Vitamin C Face Mask",
      price: 799,
      originalPrice: 1199,
      rating: 4.5,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1570554886111-e80fcac6f31f?w=400",
      brand: "VitaBeauty",
      isTrending: true
    }
  ];

  const carouselImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
      title: "Beauty Sale Up to 70% OFF",
      subtitle: "Premium skincare & makeup deals"
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
      title: "Luxury Beauty Brands",
      subtitle: "Discover top-rated beauty products"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
      title: "Skincare Essentials",
      subtitle: "Complete your beauty routine"
    }
  ];

  const categories = [
    {
      id: "c1",
      name: "Skincare",
      image: "https://images.unsplash.com/photo-1570554886111-e80fcac6f31f?w=100",
      link: "/beauty/skincare"
    },
    {
      id: "c2",
      name: "Makeup",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100",
      link: "/beauty/makeup"
    },
    {
      id: "c3",
      name: "Fragrance",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=100",
      link: "/beauty/fragrance"
    },
    {
      id: "c4",
      name: "Hair Care",
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=100",
      link: "/beauty/haircare"
    },
    {
      id: "c5",
      name: "Body Care",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=100",
      link: "/beauty/bodycare"
    },
    {
      id: "c6",
      name: "Tools",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100",
      link: "/beauty/tools"
    }
  ];

  const subcategories = [
    { id: "s1", name: "Face Serums", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80", link: "/beauty/serums" },
    { id: "s2", name: "Moisturizers", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80", link: "/beauty/moisturizers" },
    { id: "s3", name: "Lipsticks", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80", link: "/beauty/lipsticks" },
    { id: "s4", name: "Foundation", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80", link: "/beauty/foundation" },
    { id: "s5", name: "Eye Makeup", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80", link: "/beauty/eyemakeup" },
    { id: "s6", name: "Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=80", link: "/beauty/perfumes" },
    { id: "s7", name: "Shampoo", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=80", link: "/beauty/shampoo" },
    { id: "s8", name: "Face Masks", image: "https://images.unsplash.com/photo-1570554886111-e80fcac6f31f?w=80", link: "/beauty/masks" }
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
      id: "promo-b1",
      title: "Beauty Bonanza",
      subtitle: "Up to 60% off on premium beauty products",
      buttonText: "Shop Now",
      buttonLink: "/beauty/sale",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
      backgroundColor: "#fc334d"
    },
    {
      id: "promo-b2",
      title: "Skincare Special",
      subtitle: "Complete your skincare routine with top brands",
      buttonText: "Explore",
      buttonLink: "/beauty/skincare",
      image: "https://images.unsplash.com/photo-1570554886111-e80fcac6f31f?w=800",
      backgroundColor: "#08a0ef"
    }
  ];

  const dealProduct = {
    id: "deal-b1",
    name: "Premium Anti-Aging Kit",
    price: 1999,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
    brand: "LuxBeauty",
    isNew: true
  };

  const unbeatableDealsProducts = [
    {
      id: "ud-b1",
      name: "Hydrating Face Mask Set",
      price: 699,
      originalPrice: 1299,
      rating: 4.5,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1570554886111-e80fcac6f31f?w=400",
      brand: "SkinCare Pro"
    },
    {
      id: "ud-b2",
      name: "Long-Lasting Lipstick Set",
      price: 899,
      originalPrice: 1599,
      rating: 4.6,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400",
      brand: "ColorStay"
    }
  ];

  const featuredBrands = [
    { id: "fb1", name: "Lakme", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Lakme_logo.png", discount: "Up to 40% OFF", link: "/brands/lakme" },
    { id: "fb2", name: "Maybelline", logo: "https://logos-world.net/wp-content/uploads/2020/12/Maybelline-Logo.png", discount: "Up to 35% OFF", link: "/brands/maybelline" },
    { id: "fb3", name: "L'Oreal", logo: "https://logos-world.net/wp-content/uploads/2020/07/LOreal-Logo.png", discount: "Up to 50% OFF", link: "/brands/loreal" }
  ];

  const functionProducts = [
    {
      id: "f-b1",
      name: "Daily Moisturizer SPF 30",
      price: 799,
      originalPrice: 1299,
      rating: 4.4,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
      brand: "SunShield"
    },
    {
      id: "f-b2",
      name: "Waterproof Mascara",
      price: 599,
      originalPrice: 999,
      rating: 4.5,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      brand: "LashPerfect"
    }
  ];

  const topRatedProducts = [
    {
      id: "tr-b1",
      name: "Vitamin C Brightening Serum",
      price: 1299,
      originalPrice: 1999,
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      brand: "VitaGlow"
    }
  ];

  const sponsoredProducts = [
    {
      id: "sp-b1",
      name: "Premium Beauty Box",
      price: 2499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
      brand: "BeautyBox"
    }
  ];

  const dealEndTime = new Date();
  dealEndTime.setHours(dealEndTime.getHours() + 8);

  const filterCategories = ["All", "Skincare", "Makeup", "Fragrance", "Hair Care", "Tools"];

  return (
    <Layout>
      <div className="space-y-2 bg-gray-50">
        {/* Fashion Carousel Header */}
        <FashionCarousel 
          section="beauty" 
          title="Beauty & Personal Care" 
          subtitle="Discover premium beauty products and skincare essentials" 
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
              <h2 className="text-base font-semibold text-gray-800">Shop by Category</h2>
              <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5">
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
            <h2 className="text-lg font-bold text-gray-800">💥 Unbeatable Deals</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={unbeatableDealsProducts} />
        </section>

        {/* Featured Brands */}
        <HorizontalBrandSection title="Featured Brands" brands={featuredBrands} labelText="FEATURED" labelColor="bg-brand-red/10 text-brand-red" />

        {/* Promo Banner 1 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[0]} />
        </section>

        {/* Shop According to Function */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">🎯 Shop According to Function</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={functionProducts} />
        </section>

        {/* Promo Banner 2 */}
        <section className="px-3">
          <PromoBanner banner={promoBanners[1]} />
        </section>

        {/* Top Rated Brands */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">⭐ Top Rated Brands</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5">
              View All
            </Button>
          </div>
          <ProductSlider title="" products={topRatedProducts} />
        </section>

        {/* Sponsored Products */}
        <section className="px-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">💎 Sponsored Products</h2>
            <Button variant="outline" size="sm" className="text-xs border-brand-red text-brand-red hover:bg-brand-red hover:text-white rounded-lg px-3 py-1.5">
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
                      ? "bg-brand-red hover:bg-brand-red/90" 
                      : "border-gray-300 hover:border-brand-red hover:text-brand-red"
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

export default Beauty;
