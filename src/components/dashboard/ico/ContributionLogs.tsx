
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { BookOpen, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/shared/StatusBadge";

// Sample contribution data
const contributionData = [
  {
    id: 1,
    investor: "John Doe",
    email: "john.doe@example.com",
    walletAddress: "0x1a2b3c4d5e6f...",
    date: "2025-04-10",
    amount: "$12,500",
    tokens: "431,034",
    status: "confirmed",
    txHash: "0xabc123def456...",
  },
  {
    id: 2,
    investor: "Jane Smith",
    email: "jane.smith@example.com",
    walletAddress: "0x7g8h9i0j1k2l...",
    date: "2025-04-09",
    amount: "$5,800",
    tokens: "200,000",
    status: "confirmed",
    txHash: "0xmno789pqr012...",
  },
  {
    id: 3,
    investor: "Alex Johnson",
    email: "alex.j@example.com",
    walletAddress: "0x3m4n5o6p7q8r...",
    date: "2025-04-08",
    amount: "$9,200",
    tokens: "317,241",
    status: "pending",
    txHash: "Pending confirmation",
  },
  {
    id: 4,
    investor: "Sarah Williams",
    email: "s.williams@example.com",
    walletAddress: "0x9s0t1u2v3w4x...",
    date: "2025-04-07",
    amount: "$3,400",
    tokens: "117,241",
    status: "refunded",
    txHash: "0xstu456vwx789...",
  },
  {
    id: 5,
    investor: "Michael Brown",
    email: "m.brown@example.com",
    walletAddress: "0x5y6z7a8b9c0d...",
    date: "2025-04-06",
    amount: "$20,000",
    tokens: "689,655",
    status: "confirmed",
    txHash: "0xdef123ghi456...",
  },
];

const ContributionLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredData = contributionData.filter(item => 
    item.investor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="p-5">
      <SectionHeading 
        title="Contribution Logs" 
        description="Records of all investor contributions and token purchases"
        icon={BookOpen}
      />
      
      <CardContent className="p-0 mt-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by investor, email or wallet address" 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        
        {/* Contribution Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investor</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Tokens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Tx Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.investor}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{item.walletAddress}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.tokens}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground truncate max-w-[100px] inline-block">
                      {item.txHash}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination could be added here */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="ml-2">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionLogs;
