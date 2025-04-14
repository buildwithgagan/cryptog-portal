import { Check, DownloadCloud, Filter, Mail, Search, Shield, ShieldAlert, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageTitle from "@/components/shared/PageTitle";
import StatusBadge, { Status } from "@/components/shared/StatusBadge";
import { useState } from "react";

// User status type based on the StatusBadge component
type UserStatus = Extract<Status, "approved" | "pending" | "rejected">;

// Dummy user data
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", joined: "May 12, 2023", status: "approved" as UserStatus, contests: 12, totalSpent: "$240.00" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", joined: "May 15, 2023", status: "pending" as UserStatus, contests: 0, totalSpent: "$0.00" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", joined: "May 18, 2023", status: "approved" as UserStatus, contests: 5, totalSpent: "$85.00" },
  { id: 4, name: "Amanda Lee", email: "amanda@example.com", joined: "May 20, 2023", status: "rejected" as UserStatus, contests: 0, totalSpent: "$0.00" },
  { id: 5, name: "Michael Brown", email: "michael@example.com", joined: "May 22, 2023", status: "approved" as UserStatus, contests: 8, totalSpent: "$160.00" },
  { id: 6, name: "Emily Wilson", email: "emily@example.com", joined: "May 23, 2023", status: "approved" as UserStatus, contests: 3, totalSpent: "$45.00" },
  { id: 7, name: "David Miller", email: "david@example.com", joined: "May 25, 2023", status: "pending" as UserStatus, contests: 0, totalSpent: "$0.00" },
  { id: 8, name: "Sophie Taylor", email: "sophie@example.com", joined: "May 27, 2023", status: "approved" as UserStatus, contests: 1, totalSpent: "$15.00" },
  { id: 9, name: "James Wilson", email: "james@example.com", joined: "May 28, 2023", status: "approved" as UserStatus, contests: 2, totalSpent: "$30.00" },
  { id: 10, name: "Olivia Davis", email: "olivia@example.com", joined: "May 30, 2023", status: "pending" as UserStatus, contests: 0, totalSpent: "$0.00" },
  { id: 11, name: "Daniel Smith", email: "daniel@example.com", joined: "Jun 1, 2023", status: "approved" as UserStatus, contests: 6, totalSpent: "$120.00" },
  { id: 12, name: "Emma Johnson", email: "emma@example.com", joined: "Jun 3, 2023", status: "approved" as UserStatus, contests: 4, totalSpent: "$70.00" },
  { id: 13, name: "Alex Williams", email: "alex@example.com", joined: "Jun 5, 2023", status: "rejected" as UserStatus, contests: 0, totalSpent: "$0.00" },
  { id: 14, name: "Jessica Brown", email: "jessica@example.com", joined: "Jun 7, 2023", status: "approved" as UserStatus, contests: 7, totalSpent: "$140.00" },
  { id: 15, name: "Ryan Davis", email: "ryan@example.com", joined: "Jun 9, 2023", status: "pending" as UserStatus, contests: 0, totalSpent: "$0.00" },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set());
  
  const filteredUsers = usersData.filter(user => {
    // Apply search filter
    const matchesSearch = 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter.size === 0 || 
      statusFilter.has(user.status);
    
    return matchesSearch && matchesStatus;
  });

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => {
      const newSet = new Set(prev);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return newSet;
    });
  };

  const statusCounts = {
    approved: usersData.filter(user => user.status === "approved").length,
    pending: usersData.filter(user => user.status === "pending").length,
    rejected: usersData.filter(user => user.status === "rejected").length
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="User Management" 
        subtitle="View and manage all platform users"
      />

      <Card className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Shield className="h-5 w-5 text-green-600" />
              <span>
                <strong>{statusCounts.approved}</strong> Approved
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-5 w-5 text-yellow-600" />
              <span>
                <strong>{statusCounts.pending}</strong> Pending
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-5 w-5 text-red-600" />
              <span>
                <strong>{statusCounts.rejected}</strong> Rejected
              </span>
            </div>
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1.5">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={statusFilter.has("approved")}
                  onCheckedChange={() => toggleStatusFilter("approved")}
                >
                  Approved
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.has("pending")}
                  onCheckedChange={() => toggleStatusFilter("pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={statusFilter.has("rejected")}
                  onCheckedChange={() => toggleStatusFilter("rejected")}
                >
                  Rejected
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="gap-1.5">
              <DownloadCloud className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>KYC Status</th>
                <th>Contests</th>
                <th>Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <User size={16} className="text-primary" />
                      </div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Mail size={14} className="text-muted-foreground" />
                      {user.email}
                    </div>
                  </td>
                  <td className="text-muted-foreground">{user.joined}</td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td>{user.contests}</td>
                  <td>{user.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No users found matching your filters.
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
          <div>Showing {filteredUsers.length} of {usersData.length} users</div>
          
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Users;
