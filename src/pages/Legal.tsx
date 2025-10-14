
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield, Scale, AlertTriangle } from "lucide-react";

const Legal = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Information</h1>
            <p className="text-gray-600">Important legal documents and policies</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="intellectual">IP Rights</TabsTrigger>
              <TabsTrigger value="disclaimers">Disclaimers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Legal Overview
                  </CardTitle>
                  <CardDescription>Understanding our legal framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Company Information</h3>
                    <p className="text-gray-600 text-sm">
                      Obeyyo Private Limited is a company incorporated under the Companies Act, 2013, 
                      with its registered office at 123 Fashion Street, Mumbai, Maharashtra 400001, India.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Business Registration</h3>
                    <p className="text-gray-600 text-sm">
                      Corporate Identity Number (CIN): U74999MH2024PTC123456<br/>
                      GST Registration Number: 27ABCDE1234F1Z5<br/>
                      Shop and Establishment License: MH-12-34567890
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Governing Law</h3>
                    <p className="text-gray-600 text-sm">
                      These terms and all transactions are governed by Indian law and subject to the 
                      jurisdiction of Mumbai courts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Regulatory Compliance
                  </CardTitle>
                  <CardDescription>Our commitment to legal compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Data Protection</h3>
                    <p className="text-gray-600 text-sm">
                      We comply with the Information Technology Act, 2000 and IT Rules 2011 for data protection. 
                      Personal data is handled in accordance with our Privacy Policy and applicable Indian data protection laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Consumer Protection</h3>
                    <p className="text-gray-600 text-sm">
                      Our practices align with the Consumer Protection Act, 2019, ensuring fair trade practices 
                      and consumer rights protection.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">E-commerce Regulations</h3>
                    <p className="text-gray-600 text-sm">
                      We adhere to the Consumer Protection (E-Commerce) Rules, 2020, including proper disclosure 
                      of product information, return policies, and grievance mechanisms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="intellectual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Intellectual Property Rights
                  </CardTitle>
                  <CardDescription>Protection of intellectual property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Trademarks</h3>
                    <p className="text-gray-600 text-sm">
                      The Obeyyo name, logo, and all related marks are trademarks of Obeyyo Private Limited. 
                      Unauthorized use is strictly prohibited.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Copyright</h3>
                    <p className="text-gray-600 text-sm">
                      All content on this website, including text, graphics, images, and software, 
                      is protected by copyright laws and owned by Obeyyo or its licensors.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">User Content</h3>
                    <p className="text-gray-600 text-sm">
                      By submitting content (reviews, photos, etc.), you grant us a non-exclusive, 
                      royalty-free license to use, display, and distribute such content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disclaimers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Legal Disclaimers
                  </CardTitle>
                  <CardDescription>Important legal disclaimers and limitations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                    <p className="text-gray-600 text-sm">
                      Our liability is limited to the maximum extent permitted by law. We are not liable 
                      for indirect, incidental, or consequential damages arising from use of our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Product Information</h3>
                    <p className="text-gray-600 text-sm">
                      While we strive for accuracy, product descriptions, colors, and specifications may vary. 
                      We reserve the right to correct errors and update information without notice.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Third-Party Links</h3>
                    <p className="text-gray-600 text-sm">
                      Our website may contain links to third-party sites. We are not responsible for 
                      the content or practices of these external sites.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Force Majeure</h3>
                    <p className="text-gray-600 text-sm">
                      We are not liable for delays or failures due to circumstances beyond our reasonable control, 
                      including natural disasters, government actions, or technical failures.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Legal;
