
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageTitle from "@/components/shared/PageTitle";
import NotificationsTabs from "@/components/notifications/NotificationsTabs";
import { useNotifications } from "@/hooks/useNotifications";

const Notifications = () => {
  const { 
    notifications, 
    activeTab, 
    setActiveTab, 
    unreadCount, 
    filteredNotifications, 
    markAllAsRead, 
    markAsRead 
  } = useNotifications();

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
      
      <NotificationsTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        filteredNotifications={filteredNotifications}
        unreadCount={unreadCount}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
};

export default Notifications;
