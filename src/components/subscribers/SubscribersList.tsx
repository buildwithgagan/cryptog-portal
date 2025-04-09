
import { format } from "date-fns";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Subscriber } from "@/hooks/useSubscribers";

interface SubscribersListProps {
  subscribers: Subscriber[];
}

const SubscribersList = ({ subscribers }: SubscribersListProps) => {
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
          {subscribers.length > 0 ? (
            subscribers.map((subscriber) => (
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
  );
};

export default SubscribersList;
