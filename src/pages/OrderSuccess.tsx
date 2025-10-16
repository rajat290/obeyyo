import React from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-2">
          Thank you for your order. Your order has been confirmed.
        </p>
        
        {orderId && (
          <p className="text-gray-600 mb-6">
            Order ID: <span className="font-mono font-medium">{orderId}</span>
          </p>
        )}
        
        <p className="text-gray-600 mb-6">
          You will receive an email confirmation shortly.
        </p>

        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium"
          >
            View Your Orders
          </Link>
          
          <Link
            to="/products"
            className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-sm font-medium text-gray-900 mb-2">What's Next?</h3>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• You'll receive an order confirmation email</li>
            <li>• We'll notify you when your order ships</li>
            <li>• Delivery within 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;