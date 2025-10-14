
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
    itemCount: number;
    link: string;
  };
  size?: "small" | "medium" | "large";
}

const CategoryCard = ({ category, size = "medium" }: CategoryCardProps) => {
  const sizeClasses = {
    small: "h-24 w-24",
    medium: "h-32 w-32",
    large: "h-40 w-40"
  };

  return (
    <Link to={category.link} className="flex-shrink-0">
      <div className="text-center space-y-2 group">
        <div className={`${sizeClasses[size]} mx-auto rounded-full overflow-hidden bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 p-1 group-hover:scale-105 transition-transform duration-300`}>
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-800 text-sm group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-gray-500">{category.itemCount} items</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
