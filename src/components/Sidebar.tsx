
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, Heart, ShoppingBag, Gift, Phone, HelpCircle, FileText, Sparkles, Package, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [{
    name: "Men",
    path: "/men",
    icon: null
  }, {
    name: "Women",
    path: "/women",
    icon: null
  }, {
    name: "Kids",
    path: "/kids",
    icon: null
  }, {
    name: "Home & Living",
    path: "/accessories",
    icon: null
  }, {
    name: "Beauty",
    path: "/accessories",
    icon: null
  }];

  const studioItems = [{
    name: "Myntra Studio",
    path: "/",
    badge: "NEW",
    color: "bg-pink-500"
  }, {
    name: "Myntra Mall",
    path: "/",
    badge: "NEW",
    color: "bg-green-500"
  }, {
    name: "Myntra Insider",
    path: "/",
    badge: null,
    color: null
  }];

  const otherItems = [{
    name: "Gift Cards",
    path: "/gift-cards",
    icon: Gift
  }, {
    name: "Contact Us",
    path: "/contact-us",
    icon: Phone
  }, {
    name: "FAQs",
    path: "/faqs",
    icon: HelpCircle
  }, {
    name: "Legal",
    path: "/legal",
    icon: FileText
  }, {
    name: "Orders",
    path: "/orders",
    icon: Package
  }, {
    name: "Privacy Policy",
    path: "/privacy-policy",
    icon: Shield
  }, {
    name: "Terms & Conditions",
    path: "/terms-conditions",
    icon: FileText
  }, {
    name: "Shipping Info",
    path: "/shipping-info",
    icon: Truck
  }, {
    name: "Returns",
    path: "/returns",
    icon: RefreshCw
  }];

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header with Promotional Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors">
              <X className="h-5 w-5 text-white" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                ₹500 OFF
              </div>
              <img src="/lovable-uploads/fcde6e4f-7f0d-4250-9eac-15f1c0e84293.png" alt="Obeyyo" className="h-8 w-8 rounded-full bg-white p-1" />
            </div>
            
            <div className="mt-2">
              <div className="text-white text-lg font-bold">FLAT ₹500 OFF</div>
              <div className="text-white text-xs">+ Free Shipping On 1st Order</div>
              <Button size="sm" className="mt-2 bg-white text-orange-600 hover:bg-gray-100 text-xs font-bold px-3 py-1 h-6">
                SIGN UP LOGIN
              </Button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Categories */}
            <div className="py-4">
              {menuItems.map(item => (
                <Link key={item.name} to={item.path} onClick={onClose} className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 py-4">
              {studioItems.map(item => (
                <Link key={item.name} to={item.path} onClick={onClose} className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.badge && (
                      <Badge className={`text-xs text-white px-1.5 py-0.5 h-5 ${item.color}`}>
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-200 py-4">
              {otherItems.map(item => (
                <Link key={item.name} to={item.path} onClick={onClose} className="flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom App Promotion */}
          <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img src="/lovable-uploads/fcde6e4f-7f0d-4250-9eac-15f1c0e84293.png" alt="Obeyyo App" className="h-12 w-12 rounded-lg" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  Enjoy The Best Shopping Experience!
                </div>
                <Button size="sm" className="mt-2 bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-xs font-bold h-7 text-zinc-950">
                  GET OBEYYO APP
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
