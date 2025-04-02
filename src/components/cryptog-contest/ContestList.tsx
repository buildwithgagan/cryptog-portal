
import { Contest } from "./types";
import ContestCard from "./ContestCard";

interface ContestListProps {
  contests: Contest[];
  onEdit: (contest: Contest) => void;
  onDelete: (contestId: string) => void;
  formatNumber: (num: number) => string;
}

const ContestList = ({ contests, onEdit, onDelete, formatNumber }: ContestListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contests.map((contest) => (
        <ContestCard
          key={contest.id}
          contest={contest}
          onEdit={onEdit}
          onDelete={onDelete}
          formatNumber={formatNumber}
        />
      ))}
    </div>
  );
};

export default ContestList;
