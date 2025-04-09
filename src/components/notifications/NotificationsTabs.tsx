
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Notification } from "./NotificationItem";
import NotificationsList from "./NotificationsList";

interface NotificationsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: Notification[];
  filteredNotifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
}

const NotificationsTabs = ({ 
  activeTab, 
  setActiveTab, 
  notifications,
  filteredNotifications,
  unreadCount, 
  onMarkAsRead 
}: NotificationsTabsProps) => {
  return (
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

      <TabsContent value={activeTab}>
        <NotificationsList 
          notifications={filteredNotifications} 
          onMarkAsRead={onMarkAsRead}
          activeTab={activeTab}
        />
      </TabsContent>
    </Tabs>
  );
};

export default NotificationsTabs;
