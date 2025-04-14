
import { CompletedContest } from "../types/contestTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CompletedContestsTabProps {
  contests: CompletedContest[];
}

const CompletedContestsTab = ({ contests }: CompletedContestsTabProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest Name</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Prize Pool</TableHead>
            <TableHead>Winner</TableHead>
            <TableHead>Result Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest) => (
            <TableRow key={contest.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{contest.name}</TableCell>
              <TableCell>{contest.participants}</TableCell>
              <TableCell>{contest.prize}</TableCell>
              <TableCell>{contest.winner}</TableCell>
              <TableCell>
                {contest.status === "Declared" ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Declared
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedContestsTab;
