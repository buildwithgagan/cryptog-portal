
import { UpcomingContest } from "../types/contestTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UpcomingContestsTabProps {
  contests: UpcomingContest[];
}

const UpcomingContestsTab = ({ contests }: UpcomingContestsTabProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Teams Registered</TableHead>
            <TableHead>Slots Left</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest) => (
            <TableRow key={contest.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{contest.name}</TableCell>
              <TableCell>{contest.startDate}</TableCell>
              <TableCell>{contest.participants}</TableCell>
              <TableCell>{contest.slots}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpcomingContestsTab;
