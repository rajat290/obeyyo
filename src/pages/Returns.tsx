
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Package, Clock, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const Returns = () => {
  const returnReasons = [
    "Size doesn't fit",
    "Different from description",
    "Defective/Damaged item",
    "Wrong item received",
    "Changed my mind",
    "Quality issues",
    "Color different from image",
    "Late delivery"
  ];

  const returnSteps = [
    { step: 1, title: "Initiate Return", description: "Log into your account and select the item to return" },
    { step: 2, title: "Choose Reason", description: "Select the reason for return from the dropdown menu" },
    { step: 3, title: "Schedule Pickup", description: "Choose a convenient time for our team to collect the item" },
    { step: 4, title: "Quality Check", description: "We inspect the returned item to ensure it meets return criteria" },
    { step: 5, title: "Refund Processing", description: "Refund is processed once quality check is completed" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Returns & Exchanges</h1>
            <p className="text-gray-600">Easy returns with hassle-free refunds</p>
          </div>

          <div className="space-y-6">
            {/* Return Policy Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Return Policy Overview
                </CardTitle>
                <CardDescription>Simple and customer-friendly return policy</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 mx-auto text-obeyyo-pink mb-3" />
                  <h3 className="font-semibold mb-2">30-Day Returns</h3>
                  <p className="text-gray-600 text-sm">Return most items within 30 days of delivery</p>
                </div>
                <div className="text-center">
                  <Package className="h-12 w-12 mx-auto text-obeyyo-blue mb-3" />
                  <h3 className="font-semibold mb-2">Free Pickup</h3>
                  <p className="text-gray-600 text-sm">We collect returns from your doorstep at no cost</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-12 w-12 mx-auto text-obeyyo-orange mb-3" />
                  <h3 className="font-semibold mb-2">Quick Refunds</h3>
                  <p className="text-gray-600 text-sm">Refunds processed within 5-7 business days</p>
                </div>
              </CardContent>
            </Card>

            {/* Return Process */}
            <Card>
              <CardHeader>
                <CardTitle>How to Return an Item</CardTitle>
                <CardDescription>Step-by-step return process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {returnSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-obeyyo-pink text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Quick Tip</span>
                  </div>
                  <p className="text-blue-800 text-sm">
                    Keep the original packaging and tags intact for a smoother return process. 
                    Items without tags may be subject to additional verification.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Return Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle>Return Eligibility</CardTitle>
                <CardDescription>What can and cannot be returned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-green-700">✓ Returnable Items</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Clothing and footwear (with tags)</li>
                      <li>• Accessories and bags</li>
                      <li>• Electronics (in original packaging)</li>
                      <li>• Home and kitchen items</li>
                      <li>• Beauty products (unused/unopened)</li>
                      <li>• Books and stationery</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 text-red-700">✗ Non-Returnable Items</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Intimate apparel and swimwear</li>
                      <li>• Personalized/customized items</li>
                      <li>• Perishable goods and food items</li>
                      <li>• Digital downloads and gift cards</li>
                      <li>• Items damaged by misuse</li>
                      <li>• Products beyond 30-day window</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Return Reasons */}
            <Card>
              <CardHeader>
                <CardTitle>Common Return Reasons</CardTitle>
                <CardDescription>Select from these common reasons when returning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {returnReasons.map((reason, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-700">
                      {reason}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Refund Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Refund Information
                </CardTitle>
                <CardDescription>How and when you'll receive your refund</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Refund Timeline</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Credit/Debit Cards: 5-7 business days</li>
                    <li>• UPI/Digital Wallets: 2-3 business days</li>
                    <li>• Net Banking: 5-7 business days</li>
                    <li>• Cash on Delivery: Account credit or bank transfer</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Refund Method</h3>
                  <p className="text-gray-600 text-sm">
                    Refunds are processed to the original payment method used for the purchase. 
                    For COD orders, you can choose between account credit (instant) or bank transfer (3-5 days).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Partial Refunds</h3>
                  <p className="text-gray-600 text-sm">
                    If returning only some items from a multi-item order, shipping charges may be deducted 
                    from the refund if the remaining order value falls below the free shipping threshold.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Exchange Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Policy</CardTitle>
                <CardDescription>Size and color exchanges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Size Exchange</h3>
                  <p className="text-gray-600 text-sm">
                    Free size exchanges available for clothing and footwear within 30 days. 
                    If the new size is at a different price, you'll pay or receive the difference.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Color Exchange</h3>
                  <p className="text-gray-600 text-sm">
                    Color exchanges are subject to availability. If the preferred color is not available, 
                    we'll process a return and refund instead.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-900">Exchange Note</span>
                  </div>
                  <p className="text-yellow-800 text-sm">
                    Exchanges are currently available only for clothing and footwear. 
                    For other categories, please process a return and place a new order.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help with Returns?</CardTitle>
                <CardDescription>Our support team is here to assist</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> returns@obeyyo.com</p>
                      <p><strong>Phone:</strong> +91 1800-123-4567</p>
                      <p><strong>Hours:</strong> Mon-Sat 9 AM to 8 PM</p>
                      <p><strong>Response Time:</strong> Within 2 hours</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue">
                      Initiate Return
                    </Button>
                    <Button variant="outline" className="w-full border-obeyyo-pink text-obeyyo-pink">
                      Track Return Status
                    </Button>
                    <Button variant="outline" className="w-full">
                      Live Chat Support
                    </Button>
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

export default Returns;
