
import { useRef } from "react";
import { Instagram, Heart, MessageCircle } from "lucide-react";

const StarsFromInstagramSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const instagramPosts = [
    {
      id: "ig-1",
      username: "@fashionista_sara",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300",
      likes: 1234,
      comments: 89,
      caption: "Loving this new dress from @obeyyo! 💕 #OOTD #Fashion",
      productTag: "Summer Dress - ₹1,299"
    },
    {
      id: "ig-2",
      username: "@style_guru_raj",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      likes: 856,
      comments: 67,
      caption: "Perfect formal wear for my meeting today ✨ #Formal #Style",
      productTag: "Formal Shirt - ₹899"
    },
    {
      id: "ig-3",
      username: "@beauty_blogger_priya",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300", 
      likes: 2156,
      comments: 156,
      caption: "This skincare routine is everything! ✨ #Skincare #Beauty",
      productTag: "Skincare Set - ₹2,499"
    },
    {
      id: "ig-4",
      username: "@trendy_teen_mike",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300",
      likes: 945,
      comments: 78,
      caption: "New kicks are fire! 🔥 #Sneakers #Streetwear",
      productTag: "Sneakers - ₹1,999"
    }
  ];

  return (
    <section className="px-4 py-6 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Instagram className="h-6 w-6 text-pink-500" />
            Stars from Instagram
          </h2>
          <p className="text-sm text-gray-600">See how our customers style their Obeyyo finds</p>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {instagramPosts.map((post) => (
          <div key={post.id} className="flex-shrink-0 w-64">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="flex items-center p-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
                <span className="ml-2 font-medium text-sm text-gray-800">{post.username}</span>
              </div>
              
              {/* Image */}
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={`Post by ${post.username}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {post.productTag}
                </div>
              </div>
              
              {/* Engagement */}
              <div className="p-3">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{post.comments}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{post.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StarsFromInstagramSection;
