
import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PaymentOption {
  id: string;
  name: string;
  icon: string;
  offers?: string;
  isNew?: boolean;
  description?: string;
}

const Payment = () => {
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [expandedOptions, setExpandedOptions] = useState<string[]>([]);
  
  // Get cart total from navigation state or default
  const cartTotal = location.state?.total || 1769;
  
  const bankOffers = [
    {
      id: "icici",
      bank: "ICICI Bank",
      discount: "10% Discount",
      description: "On ICICI Bank Netbanking on min spend of ₹2,999",
      icon: "🏦"
    },
    {
      id: "hdfc",
      bank: "HDFC Bank", 
      discount: "15% Discount",
      description: "On HDFC Bank Credit Card on min spend of ₹3,999",
      icon: "🏦"
    },
    {
      id: "sbi",
      bank: "SBI Bank",
      discount: "5% Cashback",
      description: "On SBI Bank Debit Card on min spend of ₹1,999", 
      icon: "🏦"
    }
  ];

  const paymentOptions: PaymentOption[] = [
    {
      id: "upi",
      name: "UPI (Pay via any App)",
      icon: "📱",
      description: "Pay using Google Pay, PhonePe, Paytm & more"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      offers: "6 Offers"
    },
    {
      id: "payin3",
      name: "Pay in 3",
      icon: "📅",
      isNew: true,
      description: "Split your payment into 3 easy installments"
    },
    {
      id: "paylater",
      name: "Pay Later",
      icon: "⏰",
      description: "Buy now, pay after delivery"
    },
    {
      id: "wallets",
      name: "Wallets",
      icon: "👛",
      offers: "1 Offer"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: "🏦",
      description: "Pay using your bank account"
    }
  ];

  const toggleExpanded = (optionId: string) => {
    setExpandedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    
    // Here you would integrate with payment gateway
    console.log("Processing payment with:", selectedPayment);
    alert(`Processing payment of ₹${cartTotal.toLocaleString()} via ${selectedPayment}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center px-4 py-4">
          <Link to="/cart">
            <ArrowLeft className="w-6 h-6 text-gray-800 mr-4" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">PAYMENT</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Bank Offers Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              {bankOffers.slice(0, 4).map((offer, index) => (
                <div key={index} className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xs">{offer.icon}</span>
                </div>
              ))}
            </div>
            <span className="text-obeyyo-pink font-medium">+18 Offers</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">🏦</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">10% Discount</h3>
                <p className="text-sm text-gray-600">On ICICI Bank Netbanking on min spend of ₹2,999</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Options */}
        <div className="space-y-4">
          <h2 className="text-gray-600 font-medium">ONLINE PAYMENT OPTIONS</h2>
          
          {paymentOptions.map((option) => (
            <Card key={option.id} className="overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setSelectedPayment(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <span className="text-lg">{option.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{option.name}</span>
                      {option.isNew && (
                        <Badge className="bg-obeyyo-pink text-white text-xs px-2 py-1">
                          NEW
                        </Badge>
                      )}
                      {option.offers && (
                        <span className="text-green-600 text-sm font-medium">{option.offers}</span>
                      )}
                    </div>
                    {option.description && (
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={selectedPayment === option.id}
                    onChange={() => setSelectedPayment(option.id)}
                    className="w-4 h-4 text-obeyyo-pink"
                  />
                  <button onClick={() => toggleExpanded(option.id)}>
                    {expandedOptions.includes(option.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Expanded content for payment options */}
              {expandedOptions.includes(option.id) && (
                <div className="px-4 pb-4 border-t bg-gray-50">
                  <div className="pt-3">
                    {option.id === 'card' && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Available offers:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 10% off on HDFC Bank Cards</li>
                          <li>• 5% cashback on SBI Cards</li>
                          <li>• No cost EMI available</li>
                        </ul>
                      </div>
                    )}
                    {option.id === 'upi' && (
                      <div className="flex gap-2 mt-2">
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop" alt="GPay" className="w-8 h-8 rounded" />
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop" alt="PhonePe" className="w-8 h-8 rounded" />
                        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop" alt="Paytm" className="w-8 h-8 rounded" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-800">₹{cartTotal.toLocaleString()}</div>
            <button className="text-sm text-obeyyo-blue underline">VIEW DETAILS</button>
          </div>
          <Button 
            onClick={handlePlaceOrder}
            className="bg-obeyyo-pink hover:bg-obeyyo-pink/90 text-white px-8 py-3 rounded-lg font-semibold"
            disabled={!selectedPayment}
          >
            PLACE ORDER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
