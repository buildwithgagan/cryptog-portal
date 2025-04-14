
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { ArrowDownToLine, ArrowUpFromLine, Calendar, Download, FileText, Filter, Search, SlidersHorizontal } from "lucide-react";

const CryptogTransactions = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Placeholder data
  const transactions = [
    {
      id: "TX123456",
      user: "alex@example.com",
      type: "Deposit",
      amount: "+2,500 CTG",
      fiat: "$1,125.00",
      date: "2023-04-10",
      status: "confirmed" as const
    },
    {
      id: "TX123457",
      user: "maria@example.com",
      type: "Withdrawal",
      amount: "-1,800 CTG",
      fiat: "$810.00",
      date: "2023-04-09",
      status: "pending" as const
    },
    {
      id: "TX123458",
      user: "john@example.com",
      type: "Contest Entry",
      amount: "-500 CTG",
      fiat: "$225.00",
      date: "2023-04-08",
      status: "confirmed" as const
    },
    {
      id: "TX123459",
      user: "sarah@example.com",
      type: "Prize Payout",
      amount: "+15,000 CTG",
      fiat: "$6,750.00",
      date: "2023-04-07",
      status: "confirmed" as const
    },
    {
      id: "TX123460",
      user: "mike@example.com",
      type: "Withdrawal",
      amount: "-3,200 CTG",
      fiat: "$1,440.00",
      date: "2023-04-06",
      status: "rejected" as const
    },
    {
      id: "TX123461",
      user: "jessica@example.com",
      type: "Deposit",
      amount: "+1,000 CTG",
      fiat: "$450.00",
      date: "2023-04-05",
      status: "confirmed" as const
    }
  ];

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case "Deposit":
        return <ArrowDownToLine size={16} className="text-green-500" />;
      case "Withdrawal":
        return <ArrowUpFromLine size={16} className="text-red-500" />;
      case "Contest Entry":
        return <FileText size={16} className="text-blue-500" />;
      case "Prize Payout":
        return <ArrowDownToLine size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeading 
        title="Transaction History" 
        description="Recent platform transactions" 
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
              <TabsTrigger value="deposit" onClick={() => setActiveTab("deposit")}>Deposits</TabsTrigger>
              <TabsTrigger value="withdrawal" onClick={() => setActiveTab("withdrawal")}>Withdrawals</TabsTrigger>
              <TabsTrigger value="other" onClick={() => setActiveTab("other")}>Other</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Fiat Value</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.user}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTransactionTypeIcon(transaction.type)}
                    <span>{transaction.type}</span>
                  </div>
                </TableCell>
                <TableCell className={transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.fiat}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing 6 of 125 transactions</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default CryptogTransactions;
