
import { useState } from "react";
import { Notification } from "@/components/notifications/NotificationItem";
import { toast } from "@/hooks/use-toast";

// Mock notifications data
const initialNotifications: Notification[] = [
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
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");

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

  return {
    notifications,
    activeTab,
    setActiveTab,
    unreadCount,
    filteredNotifications,
    markAllAsRead,
    markAsRead
  };
};
