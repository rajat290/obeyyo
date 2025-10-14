
import { Button } from "@/components/ui/button";

interface TShirtCategory {
  id: string;
  name: string;
  image: string;
  link: string;
}

interface TShirtCategoriesSectionProps {
  categories: TShirtCategory[];
  title?: string;
}

const TShirtCategoriesSection = ({ categories, title }: TShirtCategoriesSectionProps) => {
  return (
    <section className="px-3">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">{title || "👕 T-Shirt Categories"}</h2>
          <Button variant="outline" size="sm" className="text-xs border-obeyyo-blue text-obeyyo-blue hover:bg-obeyyo-blue hover:text-white rounded-lg px-3 py-1.5">
            View All
          </Button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0 text-center">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-600 font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TShirtCategoriesSection;
