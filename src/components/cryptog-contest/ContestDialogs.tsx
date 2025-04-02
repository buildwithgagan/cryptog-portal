
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import ContestForm, { contestFormSchema } from "@/components/cryptog-contest/ContestForm";
import DeleteConfirmation from "@/components/cryptog-contest/DeleteConfirmation";
import { Team, Contest } from "@/components/cryptog-contest/types";
import * as z from "zod";

interface ContestDialogsProps {
  teams: Team[];
  onCreateContest: (data: z.infer<typeof contestFormSchema>) => boolean;
  onUpdateContest: (data: z.infer<typeof contestFormSchema>, contestId: string) => boolean;
  onDeleteContest: (contestId: string) => boolean;
}

const ContestDialogs = ({ 
  teams, 
  onCreateContest, 
  onUpdateContest, 
  onDeleteContest 
}: ContestDialogsProps) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [deletingContestId, setDeletingContestId] = useState<string | null>(null);

  // Create contest handler
  const handleCreateContest = (data: z.infer<typeof contestFormSchema>) => {
    const success = onCreateContest(data);
    if (success) {
      setIsCreateOpen(false);
    }
  };

  // Edit contest handler
  const handleEditContest = (data: z.infer<typeof contestFormSchema>) => {
    if (!editingContest) return;
    
    const success = onUpdateContest(data, editingContest.id);
    if (success) {
      setIsEditOpen(false);
      setEditingContest(null);
    }
  };

  // Delete contest handler
  const handleDeleteContest = () => {
    if (!deletingContestId) return;
    
    const success = onDeleteContest(deletingContestId);
    if (success) {
      setIsDeleteOpen(false);
      setDeletingContestId(null);
    }
  };

  // Public methods for external components to open modals
  const openCreateModal = () => setIsCreateOpen(true);
  
  const openEditModal = (contest: Contest) => {
    setEditingContest(contest);
    setIsEditOpen(true);
  };
  
  const openDeleteConfirmation = (contestId: string) => {
    setDeletingContestId(contestId);
    setIsDeleteOpen(true);
  };

  return {
    dialogs: (
      <>
        {/* Create Contest Modal */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Contest</DialogTitle>
            </DialogHeader>
            <ContestForm
              teams={teams}
              onSubmit={handleCreateContest}
              isEditing={false}
              onCancel={() => setIsCreateOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Contest Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Contest</DialogTitle>
            </DialogHeader>
            {editingContest && (
              <ContestForm
                teams={teams}
                onSubmit={handleEditContest}
                defaultValues={{
                  name: editingContest.name,
                  teamA: editingContest.teamA.id,
                  teamB: editingContest.teamB.id,
                  joiningFee: editingContest.joiningFee,
                  winningPrize: editingContest.winningPrize,
                }}
                isEditing={true}
                onCancel={() => {
                  setIsEditOpen(false);
                  setEditingContest(null);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogContent>
            <DeleteConfirmation onConfirm={handleDeleteContest} />
          </AlertDialogContent>
        </AlertDialog>
      </>
    ),
    openCreateModal,
    openEditModal,
    openDeleteConfirmation
  };
};

export default ContestDialogs;
