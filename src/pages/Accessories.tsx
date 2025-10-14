
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Accessories = () => {
  const products = [
    {
      id: "a1",
      name: "Luxury Leather Handbag",
      price: 2499,
      originalPrice: 3999,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      brand: "LuxeBags",
      isNew: true
    },
    {
      id: "a2",
      name: "Smart Fitness Watch",
      price: 3499,
      originalPrice: 5999,
      rating: 4.6,
      reviews: 289,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      brand: "TechFit",
      isTrending: true
    },
    {
      id: "a3",
      name: "Stylish Sunglasses",
      price: 799,
      originalPrice: 1299,
      rating: 4.4,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      brand: "EyeWear"
    },
    {
      id: "a4",
      name: "Elegant Pearl Necklace",
      price: 1999,
      originalPrice: 3499,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
      brand: "Jewelry"
    }
  ];

  const categories = ["All", "Bags", "Watches", "Jewelry", "Sunglasses", "Belts"];

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Accessories</h1>
          <p className="text-gray-600">Complete your look with our stunning accessories collection</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="ml-auto">
            <Select>
              <SelectTrigger className="w-48">
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

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Accessories;
