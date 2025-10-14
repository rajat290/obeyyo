
import { Link } from "react-router-dom";

interface TopCategoriesOfferProps {
  categories: Array<{
    id: string;
    name: string;
    image: string;
    discount: string;
    link: string;
  }>;
}

const TopCategoriesOffer = ({ categories }: TopCategoriesOfferProps) => {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Categories on Offer</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={category.link} className="group">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <p className="text-sm bg-brand-pink px-2 py-1 rounded-full inline-block mt-1">
                  {category.discount}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesOffer;
