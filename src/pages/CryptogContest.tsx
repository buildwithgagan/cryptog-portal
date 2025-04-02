import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import ContestList from "@/components/cryptog-contest/ContestList";
import ContestForm, { contestFormSchema } from "@/components/cryptog-contest/ContestForm";
import DeleteConfirmation from "@/components/cryptog-contest/DeleteConfirmation";
import { Team, Contest } from "@/components/cryptog-contest/types";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationNext 
} from "@/components/ui/pagination";
import {
  Edit, 
  Trash2, 
  Save, 
  Check, 
  X,
  MoreHorizontal,
  Trophy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CryptogContest = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [deletingContestId, setDeletingContestId] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 6;
  
  const { toast } = useToast();

  // Fetch teams (normally this would be an API call)
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
        teamA: mockTeams[0], // Bullish Titans
        teamB: mockTeams[1], // Moonshot Mavericks
        joiningFee: 100,
        winningPrize: 200000,
      },
      {
        id: "2",
        name: "Blockchain Battle Royale",
        teamA: mockTeams[2], // Diamond Hands Crew
        teamB: mockTeams[3], // Blockchain Bandits
        joiningFee: 500,
        winningPrize: 1000000,
      },
      {
        id: "3",
        name: "DeFi Duel Championship",
        teamA: mockTeams[4], // Crypto Crusaders
        teamB: mockTeams[5], // DeFi Dominators
        joiningFee: 250,
        winningPrize: 500000,
      },
      // Add more example contests to demonstrate pagination
      {
        id: "4",
        name: "NFT Warriors Challenge",
        teamA: mockTeams[6], // HODL Heroes
        teamB: mockTeams[7], // Altcoin Avengers
        joiningFee: 150,
        winningPrize: 300000,
      },
      {
        id: "5",
        name: "Whale Traders Showdown",
        teamA: mockTeams[0], // Bullish Titans
        teamB: mockTeams[3], // Blockchain Bandits
        joiningFee: 750,
        winningPrize: 1500000,
      },
      {
        id: "6",
        name: "Metaverse Masters Cup",
        teamA: mockTeams[2], // Diamond Hands Crew
        teamB: mockTeams[5], // DeFi Dominators
        joiningFee: 300,
        winningPrize: 600000,
      },
      {
        id: "7",
        name: "Web3 Wizards Tournament",
        teamA: mockTeams[1], // Moonshot Mavericks
        teamB: mockTeams[4], // Crypto Crusaders
        joiningFee: 450,
        winningPrize: 900000,
      },
      {
        id: "8",
        name: "DeFi Dragons Derby",
        teamA: mockTeams[6], // HODL Heroes
        teamB: mockTeams[3], // Blockchain Bandits
        joiningFee: 200,
        winningPrize: 400000,
      },
    ];

    setContests(exampleContests);
  }, []);

  // Handle create contest
  const handleCreateContest = (data: z.infer<typeof contestFormSchema>) => {
    // Check if contest name already exists
    if (contests.some((contest) => contest.name === data.name)) {
      toast({
        title: "Contest already exists",
        description: "Please choose a different contest name.",
        variant: "destructive",
      });
      return;
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
      return;
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
    setIsCreateOpen(false);

    toast({
      title: "Contest created",
      description: `${data.name} has been created successfully.`,
    });

    setCurrentPage(Math.ceil((contests.length + 1) / contestsPerPage)); // Navigate to the last page after adding
  };

  // Handle edit contest
  const handleEditContest = (data: z.infer<typeof contestFormSchema>) => {
    if (!editingContest) return;

    // Check if contest name already exists (excluding the current contest)
    if (
      contests.some(
        (contest) => contest.name === data.name && contest.id !== editingContest.id
      )
    ) {
      toast({
        title: "Contest already exists",
        description: "Please choose a different contest name.",
        variant: "destructive",
      });
      return;
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
      return;
    }

    const updatedContests = contests.map((contest) =>
      contest.id === editingContest.id
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
    setIsEditOpen(false);
    setEditingContest(null);

    toast({
      title: "Contest updated",
      description: `${data.name} has been updated successfully.`,
    });
  };

  // Handle delete contest
  const handleDeleteContest = () => {
    if (!deletingContestId) return;

    const contestToDelete = contests.find((contest) => contest.id === deletingContestId);
    const updatedContests = contests.filter((contest) => contest.id !== deletingContestId);

    setContests(updatedContests);
    setIsDeleteOpen(false);
    setDeletingContestId(null);

    toast({
      title: "Contest deleted",
      description: `${contestToDelete?.name} has been deleted.`,
      variant: "destructive",
    });

    // If we're on the last page and it becomes empty after deletion, go to previous page
    const totalPages = Math.ceil((contests.length - 1) / contestsPerPage);
    if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage(totalPages);
    }
  };

  // Open edit modal
  const openEditModal = (contest: Contest) => {
    setEditingContest(contest);
    setIsEditOpen(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (contestId: string) => {
    setDeletingContestId(contestId);
    setIsDeleteOpen(true);
  };

  // Open create modal
  const openCreateModal = () => {
    setIsCreateOpen(true);
  };

  // Format number with comma separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Pagination logic
  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentContests = contests.slice(indexOfFirstContest, indexOfLastContest);
  const totalPages = Math.ceil(contests.length / contestsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle
        title="Manage Cryptog Contests"
        subtitle="Create and manage cryptocurrency fantasy contests"
      />

      <div className="flex justify-between items-center">
        <SectionHeading
          title="Contest List"
          description="All created crypto fantasy contests"
        />
        <Button onClick={openCreateModal} className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Create Contest
        </Button>
      </div>

      {/* Contest Grid */}
      <ContestList 
        contests={currentContests} 
        onEdit={openEditModal} 
        onDelete={openDeleteConfirmation} 
        formatNumber={formatNumber}
      />

      {/* Pagination */}
      {contests.length > contestsPerPage && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={handlePreviousPage} 
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            <PaginationItem className="flex items-center px-4">
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext 
                onClick={handleNextPage} 
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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
    </div>
  );
};

export default CryptogContest;
