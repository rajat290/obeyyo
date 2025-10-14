
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gift, Heart, Star } from "lucide-react";

const GiftCards = () => {
  const giftCardDesigns = [
    { id: 1, name: "Birthday Special", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300", color: "bg-pink-500" },
    { id: 2, name: "Anniversary", image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=300", color: "bg-red-500" },
    { id: 3, name: "Congratulations", image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300", color: "bg-green-500" },
    { id: 4, name: "Thank You", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300", color: "bg-blue-500" },
  ];

  const amounts = [500, 1000, 2000, 5000];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Cards</h1>
            <p className="text-gray-600">Give the gift of choice with Obeyyo Gift Cards</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gift Card Design Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Choose Design
                </CardTitle>
                <CardDescription>Select a beautiful design for your gift card</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {giftCardDesigns.map((design) => (
                    <div key={design.id} className="relative cursor-pointer group">
                      <div className="aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-obeyyo-pink transition-colors">
                        <img 
                          src={design.image} 
                          alt={design.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{design.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gift Card Details */}
            <Card>
              <CardHeader>
                <CardTitle>Gift Card Details</CardTitle>
                <CardDescription>Customize your gift card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      {amounts.map((amount) => (
                        <SelectItem key={amount} value={amount.toString()}>
                          ₹{amount}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="recipient-name">Recipient Name</Label>
                  <Input id="recipient-name" placeholder="Enter recipient's name" />
                </div>

                <div>
                  <Label htmlFor="recipient-email">Recipient Email</Label>
                  <Input id="recipient-email" type="email" placeholder="Enter recipient's email" />
                </div>

                <div>
                  <Label htmlFor="message">Personal Message</Label>
                  <textarea 
                    id="message"
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-20"
                    placeholder="Write a personal message..."
                  />
                </div>

                <div>
                  <Label htmlFor="sender-name">Your Name</Label>
                  <Input id="sender-name" placeholder="Enter your name" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue">
                  Buy Gift Card
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <Gift className="h-12 w-12 mx-auto text-obeyyo-pink mb-4" />
              <h3 className="font-semibold mb-2">Easy to Send</h3>
              <p className="text-gray-600 text-sm">Digital delivery to recipient's email instantly</p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto text-obeyyo-blue mb-4" />
              <h3 className="font-semibold mb-2">No Expiry</h3>
              <p className="text-gray-600 text-sm">Gift cards never expire, use anytime</p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 mx-auto text-obeyyo-orange mb-4" />
              <h3 className="font-semibold mb-2">Full Collection</h3>
              <p className="text-gray-600 text-sm">Valid across entire Obeyyo collection</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GiftCards;
