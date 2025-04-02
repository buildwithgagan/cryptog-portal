
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Team, Contest } from "@/components/cryptog-contest/types";
import { contestFormSchema } from "@/components/cryptog-contest/ContestForm";
import * as z from "zod";

export const useCryptogContests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 6;
  const { toast } = useToast();

  // Format number with comma separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Fetch teams and initialize contests
  useEffect(() => {
    // Mock teams data
    const mockTeams: Team[] = [
      { id: "1", name: "Bullish Titans 🐂🔥" },
      { id: "2", name: "Moonshot Mavericks 🚀💰" },
      { id: "3", name: "Diamond Hands Crew 💎✋" },
      { id: "4", name: "Blockchain Bandits ⛓️🏴‍☠️" },
      { id: "5", name: "Crypto Crusaders ⚔️🪙" },
      { id: "6", name: "DeFi Dominators 🏆📈" },
      { id: "7", name: "HODL Heroes 🦸‍♂️📊" },
      { id: "8", name: "Altcoin Avengers ⚡🛡️" },
    ];

    setTeams(mockTeams);

    // Initialize with example contests
    const exampleContests: Contest[] = [
      {
        id: "1",
        name: "Ultimate Crypto Showdown",
        teamA: mockTeams[0],
        teamB: mockTeams[1],
        joiningFee: 100,
        winningPrize: 200000,
      },
      {
        id: "2",
        name: "Blockchain Battle Royale",
        teamA: mockTeams[2],
        teamB: mockTeams[3],
        joiningFee: 500,
        winningPrize: 1000000,
      },
      {
        id: "3",
        name: "DeFi Duel Championship",
        teamA: mockTeams[4],
        teamB: mockTeams[5],
        joiningFee: 250,
        winningPrize: 500000,
      },
      {
        id: "4",
        name: "NFT Warriors Challenge",
        teamA: mockTeams[6],
        teamB: mockTeams[7],
        joiningFee: 150,
        winningPrize: 300000,
      },
      {
        id: "5",
        name: "Whale Traders Showdown",
        teamA: mockTeams[0],
        teamB: mockTeams[3],
        joiningFee: 750,
        winningPrize: 1500000,
      },
      {
        id: "6",
        name: "Metaverse Masters Cup",
        teamA: mockTeams[2],
        teamB: mockTeams[5],
        joiningFee: 300,
        winningPrize: 600000,
      },
      {
        id: "7",
        name: "Web3 Wizards Tournament",
        teamA: mockTeams[1],
        teamB: mockTeams[4],
        joiningFee: 450,
        winningPrize: 900000,
      },
      {
        id: "8",
        name: "DeFi Dragons Derby",
        teamA: mockTeams[6],
        teamB: mockTeams[3],
        joiningFee: 200,
        winningPrize: 400000,
      },
    ];

    setContests(exampleContests);
  }, []);

  // Handle create contest
  const createContest = (data: z.infer<typeof contestFormSchema>) => {
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
  const updateContest = (data: z.infer<typeof contestFormSchema>, contestId: string) => {
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

    // If we're on the last page and it becomes empty after deletion, go to previous page
    const totalPages = Math.ceil((contests.length - 1) / contestsPerPage);
    if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage(totalPages);
    }
    
    return true;
  };

  // Pagination logic
  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = contests.slice(indexOfFirstContest, indexOfLastContest);
  const totalPages = Math.ceil(contests.length / contestsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {
    contests: currentContests,
    teams,
    pagination: {
      currentPage,
      totalPages,
      goToPreviousPage,
      goToNextPage,
      hasMorePages: contests.length > contestsPerPage
    },
    createContest,
    updateContest,
    deleteContest,
    formatNumber
  };
};
