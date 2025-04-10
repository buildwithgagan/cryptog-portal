
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

// Define the investor type
interface Investor {
  id: string;
  walletAddress: string;
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
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    country: "United States",
    amountInvested: 15000,
    tokensAllocated: 500000,
    date: new Date(2025, 2, 15),
    status: "completed"
  },
  {
    id: "INV-002",
    walletAddress: "0xf02C1c8e6114b1Dbe8937a39260b5b0a374432bB",
    country: "United Kingdom",
    amountInvested: 8500,
    tokensAllocated: 283333,
    date: new Date(2025, 2, 17),
    status: "completed"
  },
  {
    id: "INV-003",
    walletAddress: "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    country: "India",
    amountInvested: 5000,
    tokensAllocated: 166667,
    date: new Date(2025, 3, 1),
    status: "completed"
  },
  {
    id: "INV-004",
    walletAddress: "0x7D1AeA8138064a0229Aba5F7f5aB337C1D2F281e",
    country: "France",
    amountInvested: 12000,
    tokensAllocated: 400000,
    date: new Date(2025, 3, 3),
    status: "pending"
  },
  {
    id: "INV-005",
    walletAddress: "0x27b1Fdb04752bBc536007a920D24aCb045561c26",
    country: "Germany",
    amountInvested: 6500,
    tokensAllocated: 216667,
    date: new Date(2025, 3, 5),
    status: "completed"
  },
  {
    id: "INV-006",
    walletAddress: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    country: "China",
    amountInvested: 20000,
    tokensAllocated: 666667,
    date: new Date(2025, 3, 8),
    status: "pending"
  },
  {
    id: "INV-007",
    walletAddress: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359",
    country: "Spain",
    amountInvested: 3500,
    tokensAllocated: 116667,
    date: new Date(2025, 3, 10),
    status: "failed"
  },
  {
    id: "INV-008",
    walletAddress: "0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB",
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

// Function to truncate wallet address for display
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const InvestorsList = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wallet Address</TableHead>
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
                {truncateAddress(investor.walletAddress)}
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
