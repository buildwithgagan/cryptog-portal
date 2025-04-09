
import { Bell } from "lucide-react";
import NotificationItem, { Notification } from "./NotificationItem";

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  activeTab: string;
}

const NotificationsList = ({ notifications, onMarkAsRead, activeTab }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Bell className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-lg">No notifications</h3>
        <p className="text-muted-foreground mt-1">
          You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem 
          key={notification.id} 
          notification={notification} 
          onMarkAsRead={onMarkAsRead} 
        />
      ))}
    </div>
  );
};

export default NotificationsList;
