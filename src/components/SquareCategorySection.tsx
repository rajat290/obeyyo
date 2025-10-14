
import { Link } from "react-router-dom";

interface SquareCategorySectionProps {
  categories: Array<{
    id: string;
    name: string;
    image: string;
    link: string;
  }>;
}

const SquareCategorySection = ({ categories }: SquareCategorySectionProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={category.link} className="group">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 p-1 group-hover:scale-105 transition-transform duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-center mt-3 font-medium text-gray-800 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SquareCategorySection;
