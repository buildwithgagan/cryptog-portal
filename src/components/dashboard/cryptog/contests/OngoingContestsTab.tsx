
import { Clock } from "lucide-react";
import { OngoingContest } from "../types/contestTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContestTimer } from "../hooks/useContestTimer";

interface OngoingContestsTabProps {
  contests: OngoingContest[];
}

const OngoingContestsTab = ({ contests }: OngoingContestsTabProps) => {
  const timeLeft = useContestTimer(contests);
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest Name</TableHead>
            <TableHead>Live Timer</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>CTG Collected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest, index) => (
            <TableRow key={contest.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{contest.name}</TableCell>
              <TableCell>
                <div className="flex items-center text-primary">
                  <Clock className="mr-2 h-4 w-4" />
                  {`${timeLeft[index].hours.toString().padStart(2, '0')}:${timeLeft[index].minutes.toString().padStart(2, '0')}:${timeLeft[index].seconds.toString().padStart(2, '0')}`}
                </div>
              </TableCell>
              <TableCell>{contest.participants}</TableCell>
              <TableCell>{contest.ctgCollected.toLocaleString()} CTG</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OngoingContestsTab;
