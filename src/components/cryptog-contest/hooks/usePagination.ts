
import { useState, useMemo } from "react";
import { Contest } from "../types";

export const usePagination = (contests: Contest[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination values
  const totalPages = useMemo(
    () => Math.ceil(contests.length / itemsPerPage),
    [contests.length, itemsPerPage]
  );
  
  const indexOfLastContest = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  
  const indexOfFirstContest = useMemo(
    () => indexOfLastContest - itemsPerPage,
    [indexOfLastContest, itemsPerPage]
  );
  
  const currentContests = useMemo(
    () => contests.slice(indexOfFirstContest, indexOfLastContest),
    [contests, indexOfFirstContest, indexOfLastContest]
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentContests,
    goToPreviousPage,
    goToNextPage,
    hasMorePages: contests.length > itemsPerPage
  };
};
