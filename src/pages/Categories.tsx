
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Brands");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categoryData = {
    Brands: {
      title: "Popular Brands",
      items: [
        { id: "nike", name: "Nike", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300", link: "/brands/nike" },
        { id: "adidas", name: "Adidas", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300", link: "/brands/adidas" },
        { id: "puma", name: "Puma", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300", link: "/brands/puma" },
        { id: "zara", name: "Zara", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300", link: "/brands/zara" },
        { id: "hm", name: "H&M", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300", link: "/brands/hm" },
        { id: "see-all", name: "See All", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300", link: "/brands" }
      ]
    },
    Topwear: {
      title: "Topwear Collection",
      items: [
        { id: "tshirts", name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300", link: "/men?category=tshirts" },
        { id: "shirts", name: "Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300", link: "/men?category=shirts" },
        { id: "hoodies", name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300", link: "/men?category=hoodies" },
        { id: "jackets", name: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300", link: "/men?category=jackets" },
        { id: "sweaters", name: "Sweaters", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300", link: "/men?category=sweaters" },
        { id: "see-all", name: "See All", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300", link: "/men" }
      ]
    },
    Bottomwear: {
      title: "Bottomwear Essentials",
      items: [
        { id: "jeans", name: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300", link: "/men?category=jeans" },
        { id: "trousers", name: "Trousers", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300", link: "/men?category=trousers" },
        { id: "shorts", name: "Shorts", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300", link: "/men?category=shorts" },
        { id: "track-pants", name: "Track Pants", image: "https://images.unsplash.com/photo-1506629905607-d9d36b17abad?w=300", link: "/men?category=track-pants" },
        { id: "cargos", name: "Cargo Pants", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300", link: "/men?category=cargos" },
        { id: "see-all", name: "See All", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300", link: "/men" }
      ]
    },
    "Co-ords": {
      title: "Coordinated Sets",
      items: [
        { id: "summer-sets", name: "Summer Sets", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300", link: "/women?category=summer-sets" },
        { id: "ethnic-sets", name: "Ethnic Sets", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=300", link: "/women?category=ethnic-sets" },
        { id: "formal-sets", name: "Formal Sets", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300", link: "/women?category=formal-sets" },
        { id: "casual-sets", name: "Casual Sets", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300", link: "/women?category=casual-sets" },
        { id: "party-sets", name: "Party Sets", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300", link: "/women?category=party-sets" },
        { id: "see-all", name: "See All", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300", link: "/women" }
      ]
    },
    Athleisure: {
      title: "Active & Sports",
      items: [
        { id: "tanks", name: "Tank Tops", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300", link: "/men?category=tanks" },
        { id: "sports-tshirts", name: "Sports T-Shirts", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300", link: "/men?category=sports-tshirts" },
        { id: "tracksuits", name: "Track Suits", image: "https://images.unsplash.com/photo-1506629905607-d9d36b17abad?w=300", link: "/men?category=tracksuits" },
        { id: "yoga-wear", name: "Yoga Wear", image: "https://images.unsplash.com/photo-1506629905607-d9d36b17abad?w=300", link: "/women?category=yoga-wear" },
        { id: "running-gear", name: "Running Gear", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300", link: "/men?category=running-gear" },
        { id: "see-all", name: "See All", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300", link: "/men" }
      ]
    }
  };

  const categories = [
    { id: "Brands", name: "Brands", icon: "🏷️" },
    { id: "Topwear", name: "Top Wear", icon: "👕" },
    { id: "Bottomwear", name: "Bottom Wear", icon: "👖" },
    { id: "Co-ords", name: "Co-ords", icon: "👔" },
    { id: "Athleisure", name: "Athleisure", icon: "🏃" }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryElement = categoryRefs.current[categoryId];
    if (categoryElement && scrollAreaRef.current) {
      categoryElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle scroll to auto-switch categories
  const handleScroll = () => {
    if (!scrollAreaRef.current) return;

    const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!scrollContainer) return;

    const scrollTop = scrollContainer.scrollTop;
    const containerHeight = scrollContainer.clientHeight;

    // Find which category section is currently in view
    for (const categoryId of categories.map(cat => cat.id)) {
      const element = categoryRefs.current[categoryId];
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        
        // Check if this category section is in the viewport
        if (scrollTop >= elementTop - 100 && scrollTop < elementBottom - containerHeight + 200) {
          if (selectedCategory !== categoryId) {
            setSelectedCategory(categoryId);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    const scrollContainer = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [selectedCategory]);

  return (
    <Layout>
      <div className="flex h-screen bg-white">
        {/* Left Sidebar - Fixed Categories */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800">Collection</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`w-full text-left px-4 py-4 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-obeyyo-pink/10 to-obeyyo-blue/10 border-r-2 border-obeyyo-pink"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <span
                    className={`text-xs font-medium text-center leading-tight ${
                      selectedCategory === category.id ? "text-obeyyo-pink" : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area - Scrollable */}
        <div className="flex-1 flex flex-col">
          <ScrollArea ref={scrollAreaRef} className="flex-1">
            <div className="p-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  ref={(el) => (categoryRefs.current[category.id] = el)}
                  className="mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {categoryData[category.id as keyof typeof categoryData]?.title}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Grid Layout */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {categoryData[category.id as keyof typeof categoryData]?.items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="p-3 text-center">
                          <h4 className="font-medium text-gray-800 text-sm group-hover:text-obeyyo-pink transition-colors">
                            {item.name}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
