
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package, Shield, Calculator } from "lucide-react";

const ShippingInfo = () => {
  const shippingZones = [
    { zone: "Metro Cities", cities: "Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad", delivery: "1-2 days", charge: "Free above ₹999" },
    { zone: "Tier 1 Cities", cities: "Pune, Ahmedabad, Jaipur, Lucknow, Kanpur, Nagpur", delivery: "2-3 days", charge: "Free above ₹999" },
    { zone: "Tier 2 Cities", cities: "Agra, Bhopal, Vadodara, Nashik, Faridabad", delivery: "3-4 days", charge: "Free above ₹1299" },
    { zone: "Rest of India", cities: "All other locations", delivery: "4-7 days", charge: "Free above ₹1499" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Information</h1>
            <p className="text-gray-600">Everything you need to know about our delivery services</p>
          </div>

          <div className="space-y-6">
            {/* Shipping Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Overview
                </CardTitle>
                <CardDescription>Fast and reliable delivery across India</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto text-obeyyo-pink mb-3" />
                  <h3 className="font-semibold mb-2">Quick Delivery</h3>
                  <p className="text-gray-600 text-sm">Express delivery in 1-2 days for metro cities</p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 mx-auto text-obeyyo-blue mb-3" />
                  <h3 className="font-semibold mb-2">Secure Packaging</h3>
                  <p className="text-gray-600 text-sm">Items are carefully packed to prevent damage</p>
                </div>
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-obeyyo-orange mb-3" />
                  <h3 className="font-semibold mb-2">Pan India Coverage</h3>
                  <p className="text-gray-600 text-sm">We deliver to 20,000+ pin codes across India</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Zones */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Zones & Timelines</CardTitle>
                <CardDescription>Shipping charges and delivery times by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Zone</th>
                        <th className="text-left py-3 px-4 font-semibold">Coverage</th>
                        <th className="text-left py-3 px-4 font-semibold">Delivery Time</th>
                        <th className="text-left py-3 px-4 font-semibold">Free Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shippingZones.map((zone, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{zone.zone}</td>
                          <td className="py-3 px-4 text-gray-600 text-sm">{zone.cities}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              {zone.delivery}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-obeyyo-pink font-medium">{zone.charge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Charges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Shipping Charges
                </CardTitle>
                <CardDescription>Standard shipping rates when free shipping doesn't apply</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Standard Shipping</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Metro Cities:</span>
                        <span className="font-medium">₹49</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tier 1 Cities:</span>
                        <span className="font-medium">₹59</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tier 2 Cities:</span>
                        <span className="font-medium">₹79</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Rest of India:</span>
                        <span className="font-medium">₹99</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Express Shipping</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Metro Cities (Next Day):</span>
                        <span className="font-medium">₹149</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tier 1 Cities (1-2 Days):</span>
                        <span className="font-medium">₹199</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Same Day Delivery*:</span>
                        <span className="font-medium">₹299</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-2">*Available in select metro cities</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Processing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Processing
                </CardTitle>
                <CardDescription>How we handle your orders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Orders placed before 2 PM are processed the same day</li>
                    <li>• Orders placed after 2 PM are processed the next business day</li>
                    <li>• Weekend orders are processed on Monday</li>
                    <li>• Custom or pre-order items may take 3-5 additional days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Order Verification</h3>
                  <p className="text-gray-600 text-sm">
                    We may call to verify orders above ₹10,000 or those flagged by our fraud detection system. 
                    This helps ensure secure transactions and prevents fraudulent orders.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Packaging</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Eco-friendly packaging materials when possible</li>
                    <li>• Fragile items receive extra protective packaging</li>
                    <li>• Branded packaging for gift orders</li>
                    <li>• Discreet packaging for privacy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Special Services */}
            <Card>
              <CardHeader>
                <CardTitle>Special Shipping Services</CardTitle>
                <CardDescription>Additional services we offer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Cash on Delivery (COD)</h3>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• Available for orders up to ₹5,000</li>
                      <li>• Additional COD charges: ₹29</li>
                      <li>• Not available for all pin codes</li>
                      <li>• Exact change appreciated</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Gift Wrapping</h3>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• Premium gift wrapping available</li>
                      <li>• Charges: ₹49 per item</li>
                      <li>• Includes greeting card</li>
                      <li>• Multiple wrapping options</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Installation Services</h3>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• Available for furniture and appliances</li>
                      <li>• Charges vary by product</li>
                      <li>• Professional installation team</li>
                      <li>• Scheduled at your convenience</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Return Pickup</h3>
                    <ul className="text-gray-600 text-sm space-y-1 ml-4">
                      <li>• Free pickup for returns</li>
                      <li>• Scheduled within 24-48 hours</li>
                      <li>• No questions asked returns</li>
                      <li>• Instant refund processing</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact for Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Support</CardTitle>
                <CardDescription>Need help with your delivery?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Our shipping support team is available to help with any delivery-related questions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email:</strong> shipping@obeyyo.com</p>
                    <p><strong>Phone:</strong> +91 1800-123-4567</p>
                  </div>
                  <div>
                    <p><strong>Hours:</strong> Mon-Sat 9 AM to 8 PM</p>
                    <p><strong>Response Time:</strong> Within 2 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingInfo;
