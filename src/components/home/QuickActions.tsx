
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [{
    icon: "🔥",
    label: "Flash Sale",
    link: "/flash-sale",
    color: "#fc334d",
    bgImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop"
  }, {
    icon: "🌟",
    label: "New Arrivals",
    link: "/new-arrivals",
    color: "#f9b704",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
  }, {
    icon: "🏆",
    label: "Top Brands",
    link: "/top-brands",
    color: "#08a0ef",
    bgImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
  }, {
    icon: "💰",
    label: "Budget Picks",
    link: "/budget",
    color: "#fb8619",
    bgImage: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop"
  }];

  return (
    <div className="px-4">
      <div className="grid grid-cols-4 gap-3">
        {actions.map(action => 
          <Link 
            key={action.label} 
            to={action.link} 
            className="relative bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all overflow-hidden h-24 flex flex-col justify-center items-center group"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${action.bgImage})` }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Content */}
            <div className="relative z-10 text-white">
              <div className="text-lg mb-1">{action.icon}</div>
              <span className="text-xs font-semibold text-shadow">{action.label}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
