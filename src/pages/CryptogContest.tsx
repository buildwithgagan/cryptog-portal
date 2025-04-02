
import { useState, useEffect } from "react";
import { 
  Trophy,
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  Check, 
  X 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";

// Team type (similar to the one in CryptogTeam)
interface Team {
  id: string;
  name: string;
}

// Contest type
interface Contest {
  id: string;
  name: string;
  teamA: Team;
  teamB: Team;
  joiningFee: number;
  winningPrize: number;
}

// Form validation schema
const contestFormSchema = z.object({
  name: z.string().min(1, "Contest name is required"),
  teamA: z.string().min(1, "First team is required"),
  teamB: z.string().min(1, "Second team is required"),
  joiningFee: z.number().min(1, "Joining fee must be greater than 0 CTOG"),
  winningPrize: z.number().min(1, "Winning prize must be greater than 0 CTOG"),
}).refine((data) => data.teamA !== data.teamB, {
  message: "Team A and Team B must be different",
  path: ["teamB"],
}).refine((data) => data.winningPrize > data.joiningFee, {
  message: "Winning prize must be greater than joining fee",
  path: ["winningPrize"],
});

const CryptogContest = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | null>(null);
  const [deletingContestId, setDeletingContestId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<z.infer<typeof contestFormSchema>>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: {
      name: "",
      teamA: "",
      teamB: "",
      joiningFee: 100,
      winningPrize: 200,
    },
  });

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
    form.reset();

    toast({
      title: "Contest created",
      description: `${data.name} has been created successfully.`,
    });
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
    form.reset();

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
  };

  // Open edit modal
  const openEditModal = (contest: Contest) => {
    setEditingContest(contest);
    form.reset({
      name: contest.name,
      teamA: contest.teamA.id,
      teamB: contest.teamB.id,
      joiningFee: contest.joiningFee,
      winningPrize: contest.winningPrize,
    });
    setIsEditOpen(true);
  };

  // Open delete confirmation
  const openDeleteConfirmation = (contestId: string) => {
    setDeletingContestId(contestId);
    setIsDeleteOpen(true);
  };

  // Open create modal
  const openCreateModal = () => {
    form.reset({
      name: "",
      teamA: "",
      teamB: "",
      joiningFee: 100,
      winningPrize: 200,
    });
    setIsCreateOpen(true);
  };

  // Format number with comma separators
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <Card key={contest.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-200">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  {contest.name}
                </CardTitle>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(contest)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => openDeleteConfirmation(contest.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
        ))}
      </div>

      {/* Create Contest Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Contest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateContest)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contest name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique name for this contest
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teamA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team A</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team A" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem
                              key={`teamA-${team.id}`}
                              value={team.id}
                              disabled={team.id === form.getValues().teamB}
                            >
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team B</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team B" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem
                              key={`teamB-${team.id}`}
                              value={team.id}
                              disabled={team.id === form.getValues().teamA}
                            >
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Teams must be different
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="joiningFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining Fee (CTOG)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          placeholder="Enter joining fee"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be greater than 0
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="winningPrize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Winning Prize (CTOG)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          placeholder="Enter winning prize"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be greater than joining fee
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                >
                  <Save className="mr-2 h-4 w-4" /> Create Contest
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Contest Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Contest</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditContest)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contest Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contest name" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a unique name for this contest
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teamA"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team A</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team A" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem
                              key={`edit-teamA-${team.id}`}
                              value={team.id}
                              disabled={team.id === form.getValues().teamB}
                            >
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teamB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team B</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team B" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem
                              key={`edit-teamB-${team.id}`}
                              value={team.id}
                              disabled={team.id === form.getValues().teamA}
                            >
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Teams must be different
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="joiningFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Joining Fee (CTOG)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          placeholder="Enter joining fee"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be greater than 0
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="winningPrize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Winning Prize (CTOG)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          placeholder="Enter winning prize"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Must be greater than joining fee
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  disabled={!form.formState.isValid}
                >
                  <Check className="mr-2 h-4 w-4" /> Update Contest
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
            <AlertDialogTitle>Delete Contest</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this contest? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteContest}
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

export default CryptogContest;
