
import { Users, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Team } from "./types";

interface TeamCardProps {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (teamId: string) => void;
}

const TeamCard = ({ team, onEdit, onDelete }: TeamCardProps) => {
  return (
    <Card className="overflow-hidden relative">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg w-full pr-8">{team.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 h-8 w-8 hover:bg-muted focus:bg-muted"
              >
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(team)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(team.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mt-2">
          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Players: 10/10
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-1">
          <div className="text-sm font-medium">Team Players:</div>
          <div className="flex flex-wrap gap-1.5">
            {team.players.map((player) => (
              <Badge
                key={player.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {player.icon}
                <span>{player.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
