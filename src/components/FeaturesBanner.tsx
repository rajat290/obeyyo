
import { Truck, RotateCcw, Headphones, Shield } from "lucide-react";

const FeaturesBanner = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30 day return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Customer support"
    },
    {
      icon: Shield,
      title: "Original Certified",
      description: "100% authentic products"
    }
  ];

  return (
    <section className="px-4">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-8 h-8 bg-[#FF6B9D] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
