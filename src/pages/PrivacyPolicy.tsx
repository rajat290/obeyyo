
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, UserCheck, Database, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">How we collect, use, and protect your information</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
          </div>

          <div className="space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Our Commitment to Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  At Obeyyo, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Information We Collect
                </CardTitle>
                <CardDescription>Types of information we may collect from you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Name, email address, phone number</li>
                    <li>• Billing and shipping addresses</li>
                    <li>• Payment information (processed securely by payment processors)</li>
                    <li>• Account credentials and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Usage Information</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Browser type and version</li>
                    <li>• Pages visited and time spent on site</li>
                    <li>• Search queries and product interactions</li>
                    <li>• Device information and IP address</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cookies and Tracking</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Essential cookies for site functionality</li>
                    <li>• Analytics cookies to improve user experience</li>
                    <li>• Marketing cookies for personalized advertising</li>
                    <li>• Third-party cookies from integrated services</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  How We Use Your Information
                </CardTitle>
                <CardDescription>Purposes for which we process your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Provision</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Process and fulfill your orders</li>
                    <li>• Provide customer support and assistance</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Manage your account and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Communication</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Send promotional emails and newsletters</li>
                    <li>• Notify you about sales and special offers</li>
                    <li>• Respond to your inquiries and feedback</li>
                    <li>• Send important service announcements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Improvement and Analytics</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Analyze website usage and performance</li>
                    <li>• Personalize your shopping experience</li>
                    <li>• Improve our products and services</li>
                    <li>• Conduct market research and analysis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Data Security
                </CardTitle>
                <CardDescription>How we protect your information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Security Measures</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing through certified providers</li>
                    <li>• Regular security audits and vulnerability assessments</li>
                    <li>• Access controls and employee training</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Retention</h3>
                  <p className="text-gray-600 text-sm">
                    We retain your personal information only as long as necessary to fulfill the purposes 
                    outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Your Rights
                </CardTitle>
                <CardDescription>Control over your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Access and Control</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Access and review your personal information</li>
                    <li>• Update or correct inaccurate data</li>
                    <li>• Delete your account and associated data</li>
                    <li>• Opt-out of marketing communications</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Portability</h3>
                  <p className="text-gray-600 text-sm">
                    You have the right to request a copy of your personal data in a structured, 
                    commonly used, and machine-readable format.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Third Parties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Third-Party Services
                </CardTitle>
                <CardDescription>How we work with external services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Providers</h3>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Payment processors for secure transactions</li>
                    <li>• Shipping companies for order delivery</li>
                    <li>• Analytics services for website optimization</li>
                    <li>• Customer support platforms</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Sharing</h3>
                  <p className="text-gray-600 text-sm">
                    We do not sell your personal information to third parties. We may share your information 
                    with trusted service providers who assist us in operating our business, but only to the 
                    extent necessary for them to provide their services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Questions about this privacy policy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  If you have questions or concerns about this Privacy Policy or our data practices, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@obeyyo.com</p>
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

export default PrivacyPolicy;
