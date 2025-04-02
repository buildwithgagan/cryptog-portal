
import TeamCard from "./TeamCard";
import { Team } from "./types";

interface TeamListProps {
  teams: Team[];
  onEdit: (team: Team) => void;
  onDelete: (teamId: string) => void;
}

const TeamList = ({ teams, onEdit, onDelete }: TeamListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TeamList;
