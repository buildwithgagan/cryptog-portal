
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Types for our subscribers
export interface Subscriber {
  id: string;
  email: string;
  name: string;
  subscribedDate: Date;
  status: "active" | "inactive" | "pending";
  source: "website" | "campaign" | "referral" | "manual";
}

export const useSubscribers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Our dummy subscribers data
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      subscribedDate: new Date(2023, 5, 15),
      status: "active",
      source: "website"
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      subscribedDate: new Date(2023, 6, 22),
      status: "active",
      source: "campaign"
    },
    {
      id: "3",
      email: "michael.brown@example.com",
      name: "Michael Brown",
      subscribedDate: new Date(2023, 7, 10),
      status: "inactive",
      source: "website"
    },
    {
      id: "4",
      email: "sarah.wilson@example.com",
      name: "Sarah Wilson",
      subscribedDate: new Date(2023, 8, 5),
      status: "active",
      source: "referral"
    },
    {
      id: "5",
      email: "david.johnson@example.com",
      name: "David Johnson",
      subscribedDate: new Date(2023, 9, 12),
      status: "pending",
      source: "campaign"
    },
    {
      id: "6",
      email: "emma.taylor@example.com",
      name: "Emma Taylor",
      subscribedDate: new Date(2023, 10, 8),
      status: "active",
      source: "website"
    },
    {
      id: "7",
      email: "robert.anderson@example.com",
      name: "Robert Anderson",
      subscribedDate: new Date(2023, 11, 20),
      status: "inactive",
      source: "manual"
    },
    {
      id: "8",
      email: "olivia.martin@example.com",
      name: "Olivia Martin",
      subscribedDate: new Date(2024, 0, 15),
      status: "active",
      source: "referral"
    },
    {
      id: "9",
      email: "william.jackson@example.com",
      name: "William Jackson",
      subscribedDate: new Date(2024, 1, 7),
      status: "pending",
      source: "website"
    },
    {
      id: "10",
      email: "sophia.white@example.com",
      name: "Sophia White",
      subscribedDate: new Date(2024, 2, 18),
      status: "active",
      source: "campaign"
    }
  ]);

  // Filter subscribers based on search and tab
  const filteredSubscribers = subscribers.filter(subscriber => {
    // Search filter
    const matchesSearch = searchQuery.trim() === '' || 
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && subscriber.status === "active") ||
      (activeTab === "inactive" && subscriber.status === "inactive") ||
      (activeTab === "pending" && subscriber.status === "pending");
    
    return matchesSearch && matchesTab;
  });

  // Handler for exporting subscribers
  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: `Exporting ${filteredSubscribers.length} subscribers to CSV`,
    });
  };

  return {
    subscribers,
    filteredSubscribers,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleExport
  };
};
