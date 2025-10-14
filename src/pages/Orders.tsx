
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Truck, CheckCircle, Clock, ArrowRight, Star } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 2499,
      items: [
        { name: "Cotton T-Shirt", brand: "Nike", size: "M", color: "Blue", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150", price: 1299 },
        { name: "Denim Jeans", brand: "Levi's", size: "32", color: "Dark Blue", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150", price: 1200 }
      ],
      deliveryDate: "2024-01-18",
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 1599,
      items: [
        { name: "Casual Shirt", brand: "Zara", size: "L", color: "White", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150", price: 1599 }
      ],
      estimatedDelivery: "2024-01-23",
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 899,
      items: [
        { name: "Sports Shoes", brand: "Adidas", size: "9", color: "Black", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=150", price: 899 }
      ],
      estimatedDelivery: "2024-01-25"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-500";
      case "shipped": return "bg-blue-500";
      case "processing": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const renderOrderCard = (order: any) => (
    <Card key={order.id} className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>Ordered on {new Date(order.date).toLocaleDateString()}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order Items */}
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.brand} • Size: {item.size} • Color: {item.color}</p>
                  <p className="text-sm font-semibold text-obeyyo-pink">₹{item.price}</p>
                </div>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm" className="border-obeyyo-pink text-obeyyo-pink">
                    <Star className="h-4 w-4 mr-1" />
                    Rate
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600">
                {order.status === "delivered" ? "Delivered on" : "Expected delivery"}: {" "}
                <span className="font-semibold">
                  {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 
                   order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : "TBD"}
                </span>
              </p>
              {order.trackingNumber && (
                <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">₹{order.total}</p>
              <div className="flex gap-2 mt-2">
                {order.status !== "delivered" && (
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div>
                {orders.map(renderOrderCard)}
              </div>
            </TabsContent>

            <TabsContent value="processing">
              <div>
                {orders.filter(order => order.status === "processing").map(renderOrderCard)}
              </div>
            </TabsContent>

            <TabsContent value="shipped">
              <div>
                {orders.filter(order => order.status === "shipped").map(renderOrderCard)}
              </div>
            </TabsContent>

            <TabsContent value="delivered">
              <div>
                {orders.filter(order => order.status === "delivered").map(renderOrderCard)}
              </div>
            </TabsContent>
          </Tabs>

          {/* Empty State */}
          {orders.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                <Button className="bg-gradient-to-r from-obeyyo-pink to-obeyyo-blue">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
