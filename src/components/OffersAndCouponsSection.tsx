
import { Button } from "@/components/ui/button";
import { Copy, Gift, Percent } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}

interface OffersAndCouponsSectionProps {
  coupons: Coupon[];
}

const OffersAndCouponsSection = ({ coupons }: OffersAndCouponsSectionProps) => {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  return (
    <section className="px-3">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">🎫 Offers & Coupons</h2>
          <Button variant="outline" size="sm" className="text-xs border-obeyyo-orange text-obeyyo-orange hover:bg-obeyyo-orange hover:text-white rounded-lg px-3 py-1.5">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="bg-gradient-to-r from-obeyyo-orange/10 to-obeyyo-red/10 rounded-lg p-4 border-l-4 border-obeyyo-orange">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Percent className="w-4 h-4 text-obeyyo-orange" />
                    <span className="font-bold text-obeyyo-red text-lg">{coupon.discount}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{coupon.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                  <p className="text-xs text-gray-500">Valid until {coupon.validUntil}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="bg-white rounded-lg px-3 py-2 border-2 border-dashed border-obeyyo-orange">
                    <span className="font-mono font-bold text-obeyyo-orange">{coupon.code}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(coupon.code)}
                    className="text-xs border-obeyyo-orange text-obeyyo-orange hover:bg-obeyyo-orange hover:text-white"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
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

export default OffersAndCouponsSection;
