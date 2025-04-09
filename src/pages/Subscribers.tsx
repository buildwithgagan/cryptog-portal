
import { useState } from "react";
import { Mail, Calendar, CheckCircle2, X, Search, Download, UserPlus } from "lucide-react";
import { format } from "date-fns";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Types for our subscribers
interface Subscriber {
  id: string;
  email: string;
  name: string;
  subscribedDate: Date;
  status: "active" | "inactive" | "pending";
  source: "website" | "campaign" | "referral" | "manual";
}

const Subscribers = () => {
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

  // Handler for exporting subscribers (would actually implement CSV export)
  const handleExport = () => {
    toast({
      title: "Export initiated",
      description: `Exporting ${filteredSubscribers.length} subscribers to CSV`,
    });
  };

  // Get status badge component
  const getStatusBadge = (status: Subscriber["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "inactive":
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle 
          title="Subscribers" 
          subtitle="Manage your newsletter subscribers."
        />
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button 
            size="sm" 
            onClick={handleExport}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <Button 
            size="sm"
            className="flex items-center gap-1"
          >
            <UserPlus className="h-4 w-4" />
            Add Subscriber
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subscribers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date Subscribed</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.length > 0 ? (
              filteredSubscribers.map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <TableCell className="font-medium">{subscriber.name}</TableCell>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell className="capitalize">{subscriber.source}</TableCell>
                  <TableCell>{format(subscriber.subscribedDate, "MMM d, yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Mail className="h-8 w-8 mb-2" />
                    <p>No subscribers found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Subscribers;
