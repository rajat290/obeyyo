
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface RoundCategorySectionProps {
  categories: Category[];
  title?: string;
}

const RoundCategorySection = ({ categories, title = "Categories" }: RoundCategorySectionProps) => {
  // Extend categories to ensure we have enough for 4 rows
  const extendedCategories = [...categories];
  while (extendedCategories.length < 16) {
    extendedCategories.push(...categories.slice(0, Math.min(categories.length, 16 - extendedCategories.length)));
  }

  return (
    <section className="px-4 py-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {extendedCategories.slice(0, 16).map((category, index) => (
          <Link key={`${category.id}-${index}`} to={category.link} className="text-center group">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-600 leading-tight">{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RoundCategorySection;
