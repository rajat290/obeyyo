
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, ShoppingBag, Truck, RefreshCw, CreditCard } from "lucide-react";

const FAQs = () => {
  const faqCategories = [
    {
      title: "Orders & Shopping",
      icon: ShoppingBag,
      faqs: [
        {
          question: "How do I place an order?",
          answer: "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
        },
        {
          question: "Can I modify my order after placing it?",
          answer: "You can modify your order within 30 minutes of placing it. After that, the order enters processing and cannot be changed. Contact customer service immediately if you need to make changes."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      faqs: [
        {
          question: "How long does delivery take?",
          answer: "Standard delivery takes 3-7 business days. Express delivery is available for 1-2 business days at an additional cost. Metro cities typically receive orders faster."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes! We offer free standard shipping on orders above ₹999. Express shipping charges apply based on location and order value."
        },
        {
          question: "Can I track my order?",
          answer: "Absolutely! Once your order ships, you'll receive a tracking number via SMS and email. You can also track your order in the 'My Orders' section of your account."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: RefreshCw,
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in the same condition as received."
        },
        {
          question: "How do I return an item?",
          answer: "Go to 'My Orders', select the item you want to return, choose a reason, and schedule a pickup. Our team will collect the item from your address free of charge."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive and verify the returned item. The refund will be credited to your original payment method."
        }
      ]
    },
    {
      title: "Account & Support",
      icon: HelpCircle,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Sign Up' at the top of the page, enter your email and create a password. You can also sign up using your Google or Facebook account for faster registration."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach us via live chat, email at support@obeyyo.com, or call our customer service at +91 1800-123-4567. Our support team is available Mon-Sat 9 AM to 8 PM."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
            <p className="text-gray-600">Find answers to common questions about shopping with Obeyyo</p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search for answers..." className="pl-10" />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-obeyyo-pink" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>Common questions about {category.title.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Still Need Help */}
          <Card className="mt-8 bg-gradient-to-r from-obeyyo-pink/10 to-obeyyo-blue/10">
            <CardHeader className="text-center">
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>Can't find what you're looking for? Our support team is here to help!</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 bg-obeyyo-pink text-white rounded-lg hover:bg-obeyyo-pink/90 transition-colors">
                  Contact Support
                </button>
                <button className="px-6 py-2 border border-obeyyo-blue text-obeyyo-blue rounded-lg hover:bg-obeyyo-blue hover:text-white transition-colors">
                  Live Chat
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
