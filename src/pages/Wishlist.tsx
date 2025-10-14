
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    // Mock product data - in real app, you'd fetch from API
    const allProducts = [
      {
        id: "t-1",
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
        id: "t-2",
        name: "Cropped Denim Jacket",
        price: 1599,
        originalPrice: 2999,
        rating: 4.6,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        brand: "RebelWear",
        isTrending: true
      },
      {
        id: "fs-1",
        name: "Premium Wireless Headphones",
        price: 1999,
        originalPrice: 4999,
        rating: 4.9,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        brand: "AudioMax",
        isFlashSale: true
      },
      {
        id: "na-1",
        name: "Designer Midi Dress",
        price: 2299,
        originalPrice: 3999,
        rating: 4.8,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
        brand: "ElegantWear",
        isNew: true
      }
    ];
    
    const wishlistedItems = allProducts.filter(product => wishlist.includes(product.id));
    setWishlistedProducts(wishlistedItems);
  }, []);

  if (wishlistedProducts.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Heart className="w-24 h-24 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 text-center mb-6">Save items you love to buy them later!</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue bg-clip-text text-transparent">
            My Wishlist ({wishlistedProducts.length})
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
