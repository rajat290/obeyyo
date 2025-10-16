import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/userCart';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import orderService from '../services/orderService';
import { Address } from '../types';
import { formatPrice } from '../utils/helpers';

const Checkout: React.FC = () => {
  const { cart, loading: cartLoading, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      navigate('/cart');
      return;
    }
    loadUserAddresses();
  }, [cart]);

  const loadUserAddresses = async (): Promise<void> => {
    try {
      const response = await userService.getAddresses();
      const userAddresses = response.data?.addresses || [];
      setAddresses(userAddresses);
      
      // Select default address if available
      const defaultAddress = userAddresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress.id);
      } else if (userAddresses.length > 0) {
        setSelectedAddress(userAddresses[0].id);
      }
    } catch (err: any) {
      console.error('Failed to load addresses:', err);
    }
  };

  const handlePlaceOrder = async (): Promise<void> => {
    if (!selectedAddress) {
      setError('Please select a delivery address');
      return;
    }

    if (!cart) return;

    try {
      setLoading(true);
      setError('');

      const selectedAddressData = addresses.find(addr => addr.id === selectedAddress);
      if (!selectedAddressData) {
        setError('Invalid address selected');
        return;
      }

      const orderData = {
        items: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color
        })),
        shippingAddress: {
          fullName: selectedAddressData.fullName,
          phone: selectedAddressData.phone,
          addressLine1: selectedAddressData.addressLine1,
          addressLine2: selectedAddressData.addressLine2,
          city: selectedAddressData.city,
          state: selectedAddressData.state,
          pincode: selectedAddressData.pincode,
          country: selectedAddressData.country
        },
        paymentMethod: paymentMethod,
        totalAmount: cart.total || calculateTotal()
      };

      const response = await orderService.createOrder(orderData);
      
      // Clear cart on successful order
      await clearCart();
      
      // Redirect to order success page
      navigate(`/order-success/${response.data?.order?.id}`);
      
    } catch (err: any) {
      setError('Failed to place order. Please try again.');
      console.error('Order creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (): number => {
    if (!cart) return 0;
    const subtotal = cart.subtotal || cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = cart.tax || subtotal * 0.18;
    const shipping = cart.shipping || (subtotal > 500 ? 0 : 50);
    return subtotal + tax + shipping;
  };

  if (cartLoading || !cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = cart.subtotal || cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cart.tax || subtotal * 0.18;
  const shipping = cart.shipping || (subtotal > 500 ? 0 : 50);
  const total = cart.total || subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
          {/* Checkout Form */}
          <div className="lg:col-span-1">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h2>
              
              {addresses.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No addresses saved</p>
                  <button
                    onClick={() => navigate('/profile')}
                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                  >
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label key={address.id} className="flex items-start">
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {address.fullName}
                          </span>
                          {address.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.addressLine1}
                          {address.addressLine2 && <>, {address.addressLine2}</>}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Cash on Delivery
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    Credit/Debit Card
                  </span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    UPI Payment
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                        {item.size && ` • Size: ${item.size}`}
                        {item.color && ` • Color: ${item.color}`}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm text-gray-900">{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress || addresses.length === 0}
                className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 inline-block"></div>
                    Placing Order...
                  </>
                ) : (
                  `Place Order • ${formatPrice(total)}`
                )}
              </button>

              <p className="mt-3 text-xs text-gray-500 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;