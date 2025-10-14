
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CreditCard, ChevronRight } from "lucide-react";

const BankOffersSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const bankOffers = [{
    id: "bo-1",
    bank: "HDFC Bank",
    offer: "15% off up to ₹3000",
    code: "HDFC15",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
  }, {
    id: "bo-2",
    bank: "SBI Cards",
    offer: "10% off up to ₹2000",
    code: "SBI10",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
  }, {
    id: "bo-3",
    bank: "ICICI Bank",
    offer: "12% off up to ₹2500",
    code: "ICICI12",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
  }];

  return (
    <section className="bg-gradient-to-r from-obeyyo-blue to-obeyyo-pink mx-4 rounded-2xl p-4 bg-zinc-950">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold text-white">Bank Offers</h2>
        </div>
        <Link to="/bank-offers" className="text-sm text-white/80 hover:text-white flex items-center gap-1 font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div ref={sliderRef} className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide scroll-smooth">
        {bankOffers.map(offer => (
          <div key={offer.id} className="flex-shrink-0 w-72">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white border border-white/30">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-8 h-8" />
                <div>
                  <h3 className="font-bold text-lg">{offer.bank}</h3>
                  <p className="text-sm opacity-90">{offer.offer}</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-2 text-center">
                <span className="font-bold">Code: {offer.code}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BankOffersSection;
