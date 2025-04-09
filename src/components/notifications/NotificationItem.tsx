
import { Bell, CheckCircle2, Clock, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type NotificationType = "info" | "success" | "warning" | "alert";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

export const getNotificationIcon = (type: NotificationType) => {
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

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <Card 
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
                    onClick={() => onMarkAsRead(notification.id)}
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
  );
};

export default NotificationItem;
