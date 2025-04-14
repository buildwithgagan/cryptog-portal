
import { useState, useEffect } from "react";
import { Team, Contest } from "@/components/cryptog-contest/types";
import { ContestFormValues } from "@/components/cryptog-contest/schema/contestFormSchema";
import { formatNumber, formatDate } from "@/components/cryptog-contest/utils/formatting";
import { getMockTeams, generateExampleContests } from "@/components/cryptog-contest/utils/mockData";
import { useContestCRUD } from "@/components/cryptog-contest/hooks/useContestCRUD";
import { usePagination } from "@/components/cryptog-contest/hooks/usePagination";

export const useCryptogContests = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [allContests, setAllContests] = useState<Contest[]>([]);
  const contestsPerPage = 6;

  // Initialize teams and contests
  useEffect(() => {
    const mockTeams = getMockTeams();
    setTeams(mockTeams);
    
    const exampleContests = generateExampleContests(mockTeams);
    setAllContests(exampleContests);
  }, []);

  // Set up pagination
  const pagination = usePagination(allContests, contestsPerPage);
  
  // Set up CRUD operations
  const { createContest, updateContest, deleteContest } = useContestCRUD(
    allContests,
    teams,
    pagination.setCurrentPage,
    contestsPerPage
  );

  return {
    contests: pagination.currentContests,
    teams,
    pagination: {
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      goToPreviousPage: pagination.goToPreviousPage,
      goToNextPage: pagination.goToNextPage,
      hasMorePages: pagination.hasMorePages
    },
    createContest,
    updateContest,
    deleteContest,
    formatNumber,
    formatDate
  };
};
