
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Minus, Plus, Trash2, ShoppingBag, MapPin, Edit3, Gift, Share, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  quantity: number;
  size?: string;
  color?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Add mock data for better demonstration
    const mockCartItems = cart.length > 0 ? cart : [
      {
        id: "1",
        name: "Men Oversized Cargos Trousers",
        price: 1149,
        originalPrice: 2299,
        image: "https://images.unsplash.com/photo-1473691955023-da1c49c95c78?w=200",
        brand: "WROGN",
        quantity: 1,
        size: "32",
        color: "Olive Green"
      }
    ];
    setCartItems(mockCartItems);
    setSelectedItems(mockCartItems.map(item => item.id));
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const getSelectedItems = () => {
    return cartItems.filter(item => selectedItems.includes(item.id));
  };

  const getTotalPrice = () => {
    return getSelectedItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalSavings = () => {
    return getSelectedItems().reduce((total, item) => {
      if (item.originalPrice) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const handleProceedToCheckout = () => {
    const total = getTotalPrice();
    const selectedCartItems = getSelectedItems();
    navigate('/payment', { state: { total, cartItems: selectedCartItems } });
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-center mb-6">Add some products to get started!</p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-gray-800">SHOPPING BAG</h1>
            <Button variant="ghost" size="sm" className="p-2">
              <Share className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">Bag</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="ml-2 text-sm text-gray-500">Address</span>
            </div>
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <span className="ml-2 text-sm text-gray-500">Payment</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-600 mt-1" />
              <div>
                <p className="font-medium text-gray-800">Deliver to: Rajat Singh, 212601</p>
                <p className="text-sm text-gray-600">247 Anand Puram Colony, Harjharganj, Fatehpur</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-obeyyo-pink font-medium">
              Change
            </Button>
          </div>
        </div>

        {/* Offers Section */}
        <div className="mx-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=24&h=24&fit=crop" alt="Offer" className="w-6 h-6 rounded" />
                  <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=24&h=24&fit=crop" alt="Offer" className="w-6 h-6 rounded" />
                  <img src="https://images.unsplash.com/photo-1556742173-1a870b3d7788?w=24&h=24&fit=crop" alt="Offer" className="w-6 h-6 rounded" />
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=24&h=24&fit=crop" alt="Offer" className="w-6 h-6 rounded" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Upto ₹250 Cashback</p>
                  <p className="text-xs text-gray-600">on UPI transaction on a min spend...</p>
                </div>
              </div>
              <span className="text-obeyyo-pink text-sm font-medium">+12 Offers ›</span>
            </div>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="mx-4 mt-4">
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-green-700 font-medium">You're saving ₹{getTotalSavings().toLocaleString()} on this order</span>
            </div>
          </div>
        </div>

        {/* Items Selection */}
        <div className="mx-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length}
                  onChange={() => {
                    if (selectedItems.length === cartItems.length) {
                      setSelectedItems([]);
                    } else {
                      setSelectedItems(cartItems.map(item => item.id));
                    }
                  }}
                  className="w-5 h-5 text-obeyyo-pink rounded border-2 border-gray-300"
                />
                <span className="font-medium">
                  {selectedItems.length}/{cartItems.length} ITEMS SELECTED 
                  <span className="text-obeyyo-pink"> (₹{getTotalPrice().toLocaleString()})</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <Share className="w-4 h-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Tag className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="mx-4 mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                  className="w-5 h-5 text-obeyyo-pink rounded border-2 border-gray-300 mt-2"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{item.brand}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">Sold by: {item.brand} C...</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="p-1"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Size: {item.size || "M"}</span>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit3 className="w-3 h-3 text-gray-400" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Edit3 className="w-3 h-3 text-gray-400" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {item.originalPrice && (
                    <div className="mt-2">
                      <Badge className="bg-red-100 text-red-600 text-xs">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Items Selected Summary */}
        <div className="mx-4 mt-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-center text-gray-600 font-medium">
              {selectedItems.length} Items selected for order
            </p>
          </div>
        </div>

        {/* Fixed Bottom Checkout */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg">
          <div className="px-4 py-4">
            <Button 
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className="w-full bg-obeyyo-pink hover:bg-obeyyo-pink/90 text-white py-4 text-lg font-semibold rounded-lg"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
