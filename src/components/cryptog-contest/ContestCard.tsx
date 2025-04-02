
import { Trophy, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Contest } from "./types";

interface ContestCardProps {
  contest: Contest;
  onEdit: (contest: Contest) => void;
  onDelete: (contestId: string) => void;
  formatNumber: (num: number) => string;
}

const ContestCard = ({ contest, onEdit, onDelete, formatNumber }: ContestCardProps) => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-200 relative">
      <CardHeader className="bg-muted/50 pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2 w-full pr-8">
            <Trophy className="h-5 w-5 text-amber-500" />
            {contest.name}
          </CardTitle>
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
              <DropdownMenuItem onClick={() => onEdit(contest)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(contest.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Competing Teams:</div>
            <div className="flex items-center justify-center p-2 bg-muted rounded-md">
              <Badge variant="secondary" className="text-xs">
                {contest.teamA.name}
              </Badge>
              <span className="mx-2 font-bold text-sm">VS</span>
              <Badge variant="secondary" className="text-xs">
                {contest.teamB.name}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-2 pb-4 space-y-2">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Joining Fee:</span>
          <span className="font-medium">{formatNumber(contest.joiningFee)} CTOG</span>
        </div>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Winning Prize:</span>
          <span className="font-semibold text-primary">{formatNumber(contest.winningPrize)} CTOG</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
