
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

// Define the investor type
interface Investor {
  id: string;
  name: string;
  email: string;
  country: string;
  amountInvested: number;
  tokensAllocated: number;
  date: Date;
  status: "pending" | "completed" | "failed";
}

// Dummy data for investors
const investors: Investor[] = [
  {
    id: "INV-001",
    name: "John Smith",
    email: "john.smith@example.com",
    country: "United States",
    amountInvested: 15000,
    tokensAllocated: 500000,
    date: new Date(2025, 2, 15),
    status: "completed"
  },
  {
    id: "INV-002",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    country: "United Kingdom",
    amountInvested: 8500,
    tokensAllocated: 283333,
    date: new Date(2025, 2, 17),
    status: "completed"
  },
  {
    id: "INV-003",
    name: "Raj Patel",
    email: "raj.patel@example.com",
    country: "India",
    amountInvested: 5000,
    tokensAllocated: 166667,
    date: new Date(2025, 3, 1),
    status: "completed"
  },
  {
    id: "INV-004",
    name: "Marie Dupont",
    email: "marie.d@example.com",
    country: "France",
    amountInvested: 12000,
    tokensAllocated: 400000,
    date: new Date(2025, 3, 3),
    status: "pending"
  },
  {
    id: "INV-005",
    name: "Hans Mueller",
    email: "hans.m@example.com",
    country: "Germany",
    amountInvested: 6500,
    tokensAllocated: 216667,
    date: new Date(2025, 3, 5),
    status: "completed"
  },
  {
    id: "INV-006",
    name: "Liu Wei",
    email: "liu.wei@example.com",
    country: "China",
    amountInvested: 20000,
    tokensAllocated: 666667,
    date: new Date(2025, 3, 8),
    status: "pending"
  },
  {
    id: "INV-007",
    name: "Carlos Rodriguez",
    email: "carlos.r@example.com",
    country: "Spain",
    amountInvested: 3500,
    tokensAllocated: 116667,
    date: new Date(2025, 3, 10),
    status: "failed"
  },
  {
    id: "INV-008",
    name: "Sophia Rossi",
    email: "sophia.r@example.com",
    country: "Italy",
    amountInvested: 7500,
    tokensAllocated: 250000,
    date: new Date(2025, 3, 12),
    status: "completed"
  }
];

const getStatusColor = (status: Investor["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const InvestorsList = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investor</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Tokens</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investors.map((investor) => (
            <TableRow key={investor.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <span className="text-xs font-medium">{investor.name.split(' ').map(n => n[0]).join('')}</span>
                  </Avatar>
                  <div>
                    <div className="font-medium">{investor.name}</div>
                    <div className="text-xs text-muted-foreground">{investor.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{investor.country}</TableCell>
              <TableCell className="text-right">${investor.amountInvested.toLocaleString()}</TableCell>
              <TableCell className="text-right">{investor.tokensAllocated.toLocaleString()}</TableCell>
              <TableCell>{formatDistanceToNow(investor.date, { addSuffix: true })}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(investor.status)}`}></span>
                  <span className="capitalize">{investor.status}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvestorsList;
