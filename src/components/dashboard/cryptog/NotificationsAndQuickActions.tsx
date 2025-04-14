
import SystemNotifications from "./SystemNotifications";
import AdminQuickActions from "./AdminQuickActions";

const NotificationsAndQuickActions = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notifications */}
      <SystemNotifications />
      
      {/* Quick Actions */}
      <AdminQuickActions />
    </div>
  );
};

export default NotificationsAndQuickActions;
