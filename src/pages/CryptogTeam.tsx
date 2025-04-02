
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import TeamList from "@/components/cryptog-team/TeamList";
import TeamForm from "@/components/cryptog-team/TeamForm";
import DeleteConfirmation from "@/components/cryptog-team/DeleteConfirmation";
import { Asset, Team, TEAM_NAME_SUGGESTIONS } from "@/components/cryptog-team/types";

// Form validation schema
const teamFormSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  players: z
    .array(z.string())
    .min(10, "You must select exactly 10 players")
    .max(10, "You must select exactly 10 players"),
});

const CryptogTeam = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [deletingTeamId, setDeletingTeamId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch assets (normally this would be an API call)
  useEffect(() => {
    // Mock assets data (in a real app, you would fetch this from an API)
    const mockAssets: Asset[] = [
      {
        id: "1",
        name: "Bitcoin",
        icon: <div className="w-4 h-4 rounded-full bg-orange-500" />,
        creditRequired: 10,
        isActive: true,
      },
      {
        id: "2",
        name: "Ethereum",
        icon: <div className="w-4 h-4 rounded-full bg-purple-500" />,
        creditRequired: 8,
        isActive: true,
      },
      {
        id: "3",
        name: "Solana",
        icon: <div className="w-4 h-4 rounded-full bg-green-500" />,
        creditRequired: 6,
        isActive: true,
      },
      {
        id: "4",
        name: "Cardano (ADA)",
        icon: <div className="w-4 h-4 rounded-full bg-blue-500" />,
        creditRequired: 4,
        isActive: true,
      },
      {
        id: "5",
        name: "Floki",
        icon: <div className="w-4 h-4 rounded-full bg-yellow-500" />,
        creditRequired: 5,
        isActive: true,
      },
      {
        id: "6",
        name: "PEPE",
        icon: <div className="w-4 h-4 rounded-full bg-green-400" />,
        creditRequired: 3,
        isActive: true,
      },
      {
        id: "7",
        name: "Dogecoin",
        icon: <div className="w-4 h-4 rounded-full bg-yellow-400" />,
        creditRequired: 5,
        isActive: true,
      },
      {
        id: "8",
        name: "Chainlink",
        icon: <div className="w-4 h-4 rounded-full bg-blue-400" />,
        creditRequired: 7,
        isActive: true,
      },
      {
        id: "9",
        name: "Polkadot",
        icon: <div className="w-4 h-4 rounded-full bg-pink-500" />,
        creditRequired: 6,
        isActive: true,
      },
      {
        id: "10",
        name: "Avalanche",
        icon: <div className="w-4 h-4 rounded-full bg-red-500" />,
        creditRequired: 7,
        isActive: true,
      },
      {
        id: "11",
        name: "Shiba Inu",
        icon: <div className="w-4 h-4 rounded-full bg-orange-400" />,
        creditRequired: 4,
        isActive: true,
      },
      {
        id: "12",
        name: "Polygon",
        icon: <div className="w-4 h-4 rounded-full bg-purple-400" />,
        creditRequired: 5,
        isActive: true,
      },
    ];

    setAssets(mockAssets);

    // Initialize with some example teams
    const exampleTeams: Team[] = [
      {
        id: "1",
        name: "Bullish Titans 🐂🔥",
        players: mockAssets.slice(0, 10),
      },
      {
        id: "2",
        name: "Moonshot Mavericks 🚀💰",
        players: mockAssets.slice(2, 12),
      },
    ];

    setTeams(exampleTeams);
  }, []);

  // Handle create team
  const handleCreateTeam = (data: z.infer<typeof teamFormSchema>) => {
    // Check if team name already exists
    if (teams.some((team) => team.name === data.name)) {
      toast({
        title: "Team already exists",
        description: "Please choose a different team name.",
        variant: "destructive",
      });
      return;
    }

    // Get selected players by id
    const selectedPlayers = assets.filter((asset) =>
      data.players.includes(asset.id)
    );

    const newTeam: Team = {
      id: `${teams.length + 1}`,
      name: data.name,
      players: selectedPlayers,
    };

    setTeams([...teams, newTeam]);
    setIsCreateOpen(false);

    toast({
      title: "Team created",
      description: `${data.name} has been created successfully.`,
    });
  };

  // Handle edit team
  const handleEditTeam = (data: z.infer<typeof teamFormSchema>) => {
    if (!editingTeam) return;

    // Check if team name already exists (excluding the current team)
    if (
      teams.some(
        (team) => team.name === data.name && team.id !== editingTeam.id
      )
    ) {
      toast({
        title: "Team already exists",
        description: "Please choose a different team name.",
        variant: "destructive",
      });
      return;
    }

    // Get selected players by id
    const selectedPlayers = assets.filter((asset) =>
      data.players.includes(asset.id)
    );

    const updatedTeams = teams.map((team) =>
      team.id === editingTeam.id
        ? { ...team, name: data.name, players: selectedPlayers }
        : team
    );

    setTeams(updatedTeams);
    setIsEditOpen(false);
    setEditingTeam(null);

    toast({
      title: "Team updated",
      description: `${data.name} has been updated successfully.`,
    });
  };

  // Handle delete team
  const handleDeleteTeam = () => {
    if (!deletingTeamId) return;

    const teamToDelete = teams.find((team) => team.id === deletingTeamId);
    const updatedTeams = teams.filter((team) => team.id !== deletingTeamId);

    setTeams(updatedTeams);
    setIsDeleteOpen(false);
    setDeletingTeamId(null);

    toast({
      title: "Team deleted",
      description: `${teamToDelete?.name} has been deleted.`,
      variant: "destructive",
    });
  };

  // Open edit modal
  const openEditModal = (team: Team) => {
    setEditingTeam(team);
    setIsEditOpen(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (teamId: string) => {
    setDeletingTeamId(teamId);
    setIsDeleteOpen(true);
  };

  // Open create modal
  const openCreateModal = () => {
    setIsCreateOpen(true);
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle
        title="Manage Cryptog Teams"
        subtitle="Create and manage cryptocurrency fantasy teams"
      />

      <div className="flex justify-between items-center">
        <SectionHeading
          title="Team List"
          description="All created crypto fantasy teams"
        />
        <Button onClick={openCreateModal} className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Create Team
        </Button>
      </div>

      {/* Team Grid */}
      <TeamList 
        teams={teams} 
        onEdit={openEditModal} 
        onDelete={openDeleteConfirmation} 
      />

      {/* Create Team Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <TeamForm 
            isEditMode={false}
            assets={assets}
            onSubmit={handleCreateTeam}
            onCancel={() => setIsCreateOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Team Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
          </DialogHeader>
          {editingTeam && (
            <TeamForm 
              isEditMode={true}
              assets={assets}
              onSubmit={handleEditTeam}
              defaultValues={{
                name: editingTeam.name,
                players: editingTeam.players.map(player => player.id)
              }}
              onCancel={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteConfirmation onDelete={handleDeleteTeam} />
      </AlertDialog>
    </div>
  );
};

export default CryptogTeam;
