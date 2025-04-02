
import { useState, useEffect } from "react";
import { Users, Edit, Trash2, Plus, X, Save, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

// Asset type (matching the one from CryptogAssets)
interface Asset {
  id: string;
  name: string;
  icon: JSX.Element;
  creditRequired: number;
  isActive: boolean;
}

// Team type
interface Team {
  id: string;
  name: string;
  players: Asset[];
}

// Predefined team names
const TEAM_NAME_SUGGESTIONS = [
  "Bullish Titans 🐂🔥",
  "Moonshot Mavericks 🚀💰",
  "Diamond Hands Crew 💎✋",
  "Blockchain Bandits ⛓️🏴‍☠️",
  "Crypto Crusaders ⚔️🪙",
  "DeFi Dominators 🏆📈",
  "HODL Heroes 🦸‍♂️📊",
  "Altcoin Avengers ⚡🛡️",
  "Whale Warriors 🐋⚔️",
  "Pump & Hold Legends 📊🚀",
];

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
  const [open, setOpen] = useState(false);
  const [customTeamName, setCustomTeamName] = useState("");
  const { toast } = useToast();

  // Initialize form
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      players: [],
    },
  });

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
    form.reset();
    setCustomTeamName("");

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
    form.reset();
    setCustomTeamName("");

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
    form.reset({
      name: team.name,
      players: team.players.map((player) => player.id),
    });
    setIsEditOpen(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (teamId: string) => {
    setDeletingTeamId(teamId);
    setIsDeleteOpen(true);
  };

  // Open create modal
  const openCreateModal = () => {
    form.reset({ name: "", players: [] });
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{team.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(team)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => openDeleteConfirmation(team.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
        ))}
      </div>

      {/* Create Team Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateTeam)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Team Name</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-full"
                          >
                            {field.value
                              ? field.value
                              : "Select or enter team name..."}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search team name..."
                            value={customTeamName}
                            onValueChange={setCustomTeamName}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {customTeamName ? (
                                <div
                                  className="px-2 py-3 text-sm cursor-pointer hover:bg-accent"
                                  onClick={() => {
                                    field.onChange(customTeamName);
                                    setOpen(false);
                                  }}
                                >
                                  Use "{customTeamName}"
                                </div>
                              ) : (
                                "No team name found."
                              )}
                            </CommandEmpty>
                            <CommandGroup>
                              {TEAM_NAME_SUGGESTIONS.map((name) => (
                                <CommandItem
                                  key={name}
                                  value={name}
                                  onSelect={() => {
                                    field.onChange(name);
                                    setOpen(false);
                                  }}
                                >
                                  {name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="players"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select Players (
                      <span
                        className={cn(
                          field.value.length === 10
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {field.value.length}/10
                      </span>
                      )
                    </FormLabel>
                    <ScrollArea className="h-[300px] border rounded-md p-4">
                      <div className="space-y-2">
                        {assets.map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`player-${asset.id}`}
                              checked={field.value.includes(asset.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                let newValue = [...field.value];

                                if (isChecked && newValue.length < 10) {
                                  newValue.push(asset.id);
                                } else if (isChecked && newValue.length >= 10) {
                                  toast({
                                    title: "Team is full",
                                    description:
                                      "A team can have exactly 10 players. Please remove a player before adding a new one.",
                                    variant: "destructive",
                                  });
                                  return;
                                } else {
                                  newValue = newValue.filter(
                                    (id) => id !== asset.id
                                  );
                                }

                                field.onChange(newValue);
                              }}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <label
                              htmlFor={`player-${asset.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                {asset.icon}
                                {asset.name}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={
                    form.getValues().players.length !== 10 ||
                    !form.getValues().name
                  }
                >
                  <Save className="mr-2 h-4 w-4" /> Save Team
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Team Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditTeam)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Team Name</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-full"
                          >
                            {field.value
                              ? field.value
                              : "Select or enter team name..."}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search team name..."
                            value={customTeamName}
                            onValueChange={setCustomTeamName}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {customTeamName ? (
                                <div
                                  className="px-2 py-3 text-sm cursor-pointer hover:bg-accent"
                                  onClick={() => {
                                    field.onChange(customTeamName);
                                    setOpen(false);
                                  }}
                                >
                                  Use "{customTeamName}"
                                </div>
                              ) : (
                                "No team name found."
                              )}
                            </CommandEmpty>
                            <CommandGroup>
                              {TEAM_NAME_SUGGESTIONS.map((name) => (
                                <CommandItem
                                  key={name}
                                  value={name}
                                  onSelect={() => {
                                    field.onChange(name);
                                    setOpen(false);
                                  }}
                                >
                                  {name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="players"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Select Players (
                      <span
                        className={cn(
                          field.value.length === 10
                            ? "text-green-500"
                            : "text-muted-foreground"
                        )}
                      >
                        {field.value.length}/10
                      </span>
                      )
                    </FormLabel>
                    <ScrollArea className="h-[300px] border rounded-md p-4">
                      <div className="space-y-2">
                        {assets.map((asset) => (
                          <div
                            key={asset.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`edit-player-${asset.id}`}
                              checked={field.value.includes(asset.id)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                let newValue = [...field.value];

                                if (isChecked && newValue.length < 10) {
                                  newValue.push(asset.id);
                                } else if (isChecked && newValue.length >= 10) {
                                  toast({
                                    title: "Team is full",
                                    description:
                                      "A team can have exactly 10 players. Please remove a player before adding a new one.",
                                    variant: "destructive",
                                  });
                                  return;
                                } else {
                                  newValue = newValue.filter(
                                    (id) => id !== asset.id
                                  );
                                }

                                field.onChange(newValue);
                              }}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <label
                              htmlFor={`edit-player-${asset.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                {asset.icon}
                                {asset.name}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    form.getValues().players.length !== 10 ||
                    !form.getValues().name
                  }
                >
                  <Check className="mr-2 h-4 w-4" /> Update Team
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CryptogTeam;
