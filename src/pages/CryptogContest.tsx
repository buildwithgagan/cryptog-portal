
import { useCryptogContests } from "@/hooks/useCryptogContests";
import ContestList from "@/components/cryptog-contest/ContestList";
import ContestPagination from "@/components/cryptog-contest/ContestPagination";
import ContestHeader from "@/components/cryptog-contest/ContestHeader";
import ContestDialogs from "@/components/cryptog-contest/ContestDialogs";

const CryptogContest = () => {
  const {
    contests, 
    teams, 
    pagination, 
    createContest, 
    updateContest, 
    deleteContest, 
    formatNumber
  } = useCryptogContests();

  // Use the ContestDialogs component
  const {
    dialogs,
    openCreateModal,
    openEditModal,
    openDeleteConfirmation
  } = ContestDialogs({
    teams,
    onCreateContest: createContest,
    onUpdateContest: updateContest,
    onDeleteContest: deleteContest
  });

  return (
    <div className="space-y-6 animate-enter">
      <ContestHeader onCreateContest={openCreateModal} />

      {/* Contest Grid */}
      <ContestList 
        contests={contests} 
        onEdit={openEditModal} 
        onDelete={openDeleteConfirmation} 
        formatNumber={formatNumber}
      />

      {/* Pagination */}
      {pagination.hasMorePages && (
        <ContestPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPreviousPage={pagination.goToPreviousPage}
          onNextPage={pagination.goToNextPage}
        />
      )}

      {/* Dialog Modals */}
      {dialogs}
    </div>
  );
};

export default CryptogContest;
