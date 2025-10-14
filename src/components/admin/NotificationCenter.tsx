
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Package, ShoppingCart, Users, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'order' | 'product' | 'user' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState({
    orderNotifications: true,
    productNotifications: true,
    userNotifications: true,
    systemNotifications: true,
    emailNotifications: true,
    pushNotifications: false,
  });
  const { toast } = useToast();

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-001 placed by John Doe for ₹2,499",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      priority: "high"
    },
    {
      id: "2",
      type: "product",
      title: "Low Stock Alert",
      message: "Casual Shirt inventory is running low (5 items remaining)",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      priority: "medium"
    },
    {
      id: "3",
      type: "user",
      title: "New User Registration",
      message: "Sarah Wilson has created a new account",
      timestamp: "2024-01-15T08:45:00Z",
      read: true,
      priority: "low"
    },
    {
      id: "4",
      type: "system",
      title: "System Update Available",
      message: "A new system update is available for installation",
      timestamp: "2024-01-14T18:00:00Z",
      read: true,
      priority: "medium"
    },
    {
      id: "5",
      type: "order",
      title: "Order Cancelled",
      message: "Order #ORD-002 has been cancelled by customer",
      timestamp: "2024-01-14T16:30:00Z",
      read: true,
      priority: "high"
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Success",
      description: "Notification deleted",
    });
  };

  const updateSettings = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: "Notification preferences saved",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart className="h-4 w-4" />;
      case 'product': return <Package className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'system': return <Info className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Notification Center</h2>
          <p className="text-gray-600">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated with the latest activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'order' ? 'bg-green-100 text-green-600' :
                          notification.type === 'product' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'user' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h3>
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Customize your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="order-notifications" className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Order Notifications</span>
                    </Label>
                    <Switch
                      id="order-notifications"
                      checked={settings.orderNotifications}
                      onCheckedChange={(checked) => updateSettings('orderNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-notifications" className="flex items-center space-x-2">
                      <Package className="h-4 w-4" />
                      <span>Product Notifications</span>
                    </Label>
                    <Switch
                      id="product-notifications"
                      checked={settings.productNotifications}
                      onCheckedChange={(checked) => updateSettings('productNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="user-notifications" className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>User Notifications</span>
                    </Label>
                    <Switch
                      id="user-notifications"
                      checked={settings.userNotifications}
                      onCheckedChange={(checked) => updateSettings('userNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notifications" className="flex items-center space-x-2">
                      <Info className="h-4 w-4" />
                      <span>System Notifications</span>
                    </Label>
                    <Switch
                      id="system-notifications"
                      checked={settings.systemNotifications}
                      onCheckedChange={(checked) => updateSettings('systemNotifications', checked)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Delivery Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications" className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span>Email Notifications</span>
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSettings('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications" className="flex items-center space-x-2">
                      <BellOff className="h-4 w-4" />
                      <span>Push Notifications</span>
                    </Label>
                    <Switch
                      id="push-notifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSettings('pushNotifications', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
