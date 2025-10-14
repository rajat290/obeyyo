
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  image: string;
  discount: string;
  link: string;
}

interface EverythingInOfferSectionProps {
  categories: Category[];
}

const EverythingInOfferSection = ({ categories }: EverythingInOfferSectionProps) => {
  return (
    <section className="px-3">
      <div className="bg-white rounded-lg p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">🛍️ Everything in Offer</h2>
          <p className="text-sm text-gray-600 mt-1">Amazing discounts across all categories</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div key={category.id} className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-3">
                  <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-obeyyo-yellow font-semibold text-sm mb-2">{category.discount}</p>
                  <Button
                    size="sm"
                    className="bg-white text-gray-800 hover:bg-gray-100 text-xs px-3 py-1 w-fit"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EverythingInOfferSection;
