
import { useState } from "react";
import { Bell, CheckCircle2, Clock, Users, Info, AlertTriangle } from "lucide-react";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

type NotificationType = "info" | "success" | "warning" | "alert";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New User Registered",
      message: "John Doe has just registered on the platform.",
      time: "10 minutes ago",
      read: false,
      type: "info"
    },
    {
      id: "2",
      title: "Contest Completed",
      message: "The Crypto Bulls vs Bears contest has completed. View results now.",
      time: "1 hour ago",
      read: false,
      type: "success"
    },
    {
      id: "3",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2AM to 4AM UTC.",
      time: "3 hours ago",
      read: true,
      type: "warning"
    },
    {
      id: "4",
      title: "Failed Login Attempt",
      message: "There was a failed login attempt from an unknown IP address.",
      time: "Yesterday",
      read: true,
      type: "alert"
    },
    {
      id: "5",
      title: "New Feature Added",
      message: "Check out the new analytics dashboard with advanced metrics!",
      time: "2 days ago",
      read: true,
      type: "info"
    },
    {
      id: "6",
      title: "Withdrawal Successful",
      message: "Your withdrawal of 2.5 ETH was processed successfully.",
      time: "3 days ago",
      read: true,
      type: "success"
    },
    {
      id: "7",
      title: "Price Alert",
      message: "BTC has dropped below your alert threshold of $50,000.",
      time: "4 days ago",
      read: true,
      type: "warning"
    }
  ]);

  // Get count of unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread"
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => notification.type === activeTab);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read",
    });
  };

  // Mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Get the appropriate icon for each notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "alert":
        return <Bell className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle 
          title="Notifications" 
          subtitle="Stay updated with the latest activities and alerts."
        />
        
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            className="mt-4 md:mt-0"
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="ml-1">{notifications.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex items-center gap-2">
            Unread
            {unreadCount > 0 && <Badge variant="secondary">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
          <TabsTrigger value="success">Success</TabsTrigger>
          <TabsTrigger value="warning">Warnings</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-colors ${!notification.read ? 'bg-muted/60' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} /> {notification.time}
                          </span>
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => markAsRead(notification.id)}
                              className="px-2 h-7 text-xs"
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg">No notifications</h3>
              <p className="text-muted-foreground mt-1">
                You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
