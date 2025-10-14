
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingCart, RefreshCw, CreditCard, Scale, AlertTriangle } from "lucide-react";

const TermsConditions = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
            <p className="text-gray-600">Agreement between you and Obeyyo</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
          </div>

          <div className="space-y-6">
            {/* Agreement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  By accessing and using the Obeyyo website and services, you agree to be bound by these 
                  Terms and Conditions. If you do not agree to these terms, please do not use our services. 
                  These terms constitute a legally binding agreement between you and Obeyyo Private Limited.
                </p>
              </CardContent>
            </Card>

            {/* Use of Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Use of Services
                </CardTitle>
                <CardDescription>How you may use our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Permitted Use</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Browse and purchase products for personal use</li>
                    <li>• Create and maintain a user account</li>
                    <li>• Write reviews and interact with content</li>
                    <li>• Contact customer support for assistance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Prohibited Use</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Using the platform for commercial resale without authorization</li>
                    <li>• Attempting to hack, disrupt, or compromise platform security</li>
                    <li>• Posting false, misleading, or inappropriate content</li>
                    <li>• Violating any applicable laws or regulations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Account Responsibility</h3>
                  <p className="text-gray-600 text-sm">
                    You are responsible for maintaining the confidentiality of your account credentials 
                    and for all activities that occur under your account. Notify us immediately of any 
                    unauthorized use of your account.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Orders and Payments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Orders and Payments
                </CardTitle>
                <CardDescription>Terms related to purchases and payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Acceptance</h3>
                  <p className="text-gray-600 text-sm">
                    All orders are subject to acceptance by Obeyyo. We reserve the right to refuse or 
                    cancel any order for any reason, including but not limited to product availability, 
                    errors in pricing or product information, or suspected fraudulent activity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• All prices are in Indian Rupees (INR) and include applicable taxes</li>
                    <li>• Prices may change without notice</li>
                    <li>• Sale prices are valid for limited time periods</li>
                    <li>• We reserve the right to correct pricing errors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Payment Terms</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Payment is required at the time of order</li>
                    <li>• We accept major credit/debit cards, UPI, and net banking</li>
                    <li>• All transactions are processed securely</li>
                    <li>• Failed payments may result in order cancellation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Returns and Refunds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Returns and Refunds
                </CardTitle>
                <CardDescription>Our return and refund policy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Return Eligibility</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Items must be returned within 30 days of delivery</li>
                    <li>• Products must be unused and in original packaging</li>
                    <li>• Some items like underwear and swimwear are non-returnable</li>
                    <li>• Return shipping is free for most items</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Refund Process</h3>
                  <p className="text-gray-600 text-sm">
                    Refunds will be processed to the original payment method within 5-7 business days 
                    after we receive and inspect the returned item. Processing times may vary depending 
                    on your bank or payment provider.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Intellectual Property
                </CardTitle>
                <CardDescription>Ownership of content and trademarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Our Content</h3>
                  <p className="text-gray-600 text-sm">
                    All content on the Obeyyo platform, including text, graphics, logos, images, and software, 
                    is the property of Obeyyo or its licensors and is protected by copyright, trademark, 
                    and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">User Content</h3>
                  <p className="text-gray-600 text-sm">
                    By submitting content (such as reviews, photos, or comments), you grant Obeyyo a 
                    non-exclusive, royalty-free, worldwide license to use, display, and distribute such 
                    content for business purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Disclaimers and Limitations
                </CardTitle>
                <CardDescription>Important legal disclaimers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Availability</h3>
                  <p className="text-gray-600 text-sm">
                    We strive to provide uninterrupted service but cannot guarantee 100% uptime. 
                    The platform may be temporarily unavailable for maintenance, updates, or due to 
                    technical issues beyond our control.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Product Information</h3>
                  <p className="text-gray-600 text-sm">
                    While we make every effort to ensure accuracy, product descriptions, images, and 
                    specifications may contain errors or may not reflect the most current information. 
                    Colors may appear differently on different devices.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-gray-600 text-sm">
                    To the maximum extent permitted by law, Obeyyo shall not be liable for any indirect, 
                    incidental, special, or consequential damages arising from your use of our services 
                    or any products purchased through our platform.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>Governing Law and Disputes</CardTitle>
                <CardDescription>Legal jurisdiction and dispute resolution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Applicable Law</h3>
                  <p className="text-gray-600 text-sm">
                    These Terms and Conditions are governed by the laws of India. Any disputes arising 
                    from these terms or your use of our services shall be subject to the exclusive 
                    jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Changes to Terms</h3>
                  <p className="text-gray-600 text-sm">
                    We reserve the right to modify these Terms and Conditions at any time. Changes will 
                    be effective immediately upon posting on the website. Your continued use of our 
                    services constitutes acceptance of the updated terms.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Questions about these terms</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  If you have questions about these Terms and Conditions, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@obeyyo.com</p>
                  <p><strong>Phone:</strong> +91 1800-123-4567</p>
                  <p><strong>Address:</strong> 123 Fashion Street, Mumbai, Maharashtra 400001, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;
