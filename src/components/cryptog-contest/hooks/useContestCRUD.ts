
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Team, Contest } from "../types";
import { ContestFormValues } from "../schema/contestFormSchema";

export const useContestCRUD = (
  initialContests: Contest[],
  teams: Team[],
  setCurrentPage: (page: number) => void,
  contestsPerPage: number
) => {
  const [contests, setContests] = useState<Contest[]>(initialContests);
  const { toast } = useToast();

  // Handle create contest
  const createContest = (data: ContestFormValues) => {
    // Check if contest name already exists
    if (contests.some((contest) => contest.name === data.name)) {
      toast({
        title: "Contest already exists",
        description: "Please choose a different contest name.",
        variant: "destructive",
      });
      return false;
    }

    // Get selected teams by id
    const selectedTeamA = teams.find((team) => team.id === data.teamA);
    const selectedTeamB = teams.find((team) => team.id === data.teamB);

    if (!selectedTeamA || !selectedTeamB) {
      toast({
        title: "Team selection error",
        description: "Both teams must be selected.",
        variant: "destructive",
      });
      return false;
    }

    const newContest: Contest = {
      id: `${contests.length + 1}`,
      name: data.name,
      teamA: selectedTeamA,
      teamB: selectedTeamB,
      joiningFee: data.joiningFee,
      winningPrize: data.winningPrize,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime,
    };

    setContests([...contests, newContest]);

    toast({
      title: "Contest created",
      description: `${data.name} has been created successfully.`,
    });

    setCurrentPage(Math.ceil((contests.length + 1) / contestsPerPage)); // Navigate to the last page after adding
    return true;
  };

  // Handle edit contest
  const updateContest = (data: ContestFormValues, contestId: string) => {
    // Check if contest name already exists (excluding the current contest)
    if (
      contests.some(
        (contest) => contest.name === data.name && contest.id !== contestId
      )
    ) {
      toast({
        title: "Contest already exists",
        description: "Please choose a different contest name.",
        variant: "destructive",
      });
      return false;
    }

    // Get selected teams by id
    const selectedTeamA = teams.find((team) => team.id === data.teamA);
    const selectedTeamB = teams.find((team) => team.id === data.teamB);

    if (!selectedTeamA || !selectedTeamB) {
      toast({
        title: "Team selection error",
        description: "Both teams must be selected.",
        variant: "destructive",
      });
      return false;
    }

    const updatedContests = contests.map((contest) =>
      contest.id === contestId
        ? {
            ...contest,
            name: data.name,
            teamA: selectedTeamA,
            teamB: selectedTeamB,
            joiningFee: data.joiningFee,
            winningPrize: data.winningPrize,
            startDateTime: data.startDateTime,
            endDateTime: data.endDateTime,
          }
        : contest
    );

    setContests(updatedContests);

    toast({
      title: "Contest updated",
      description: `${data.name} has been updated successfully.`,
    });
    
    return true;
  };

  // Handle delete contest
  const deleteContest = (contestId: string) => {
    const contestToDelete = contests.find((contest) => contest.id === contestId);
    if (!contestToDelete) return false;
    
    const updatedContests = contests.filter((contest) => contest.id !== contestId);
    setContests(updatedContests);

    toast({
      title: "Contest deleted",
      description: `${contestToDelete.name} has been deleted.`,
      variant: "destructive",
    });
    
    return true;
  };

  return {
    contests,
    createContest,
    updateContest,
    deleteContest,
  };
};
