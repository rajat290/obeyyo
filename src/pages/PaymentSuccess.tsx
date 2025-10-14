
import { useEffect } from "react";
import { CheckCircle, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const orderTotal = location.state?.total || 0;

  useEffect(() => {
    // Clear cart after successful payment
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md w-full">
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount Paid</span>
            <span className="text-xl font-bold text-obeyyo-pink">
              ₹{orderTotal.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link to="/" className="block">
            <Button className="w-full bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          
          <Link to="/profile" className="block">
            <Button variant="outline" className="w-full">
              <Package className="w-4 h-4 mr-2" />
              Track Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
