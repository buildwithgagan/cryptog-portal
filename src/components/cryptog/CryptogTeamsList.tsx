
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/shared/SectionHeading";
import { ArrowUpDown, Filter, Plus, Search, Users } from "lucide-react";

const CryptogTeamsList = () => {
  const [teamFilter, setTeamFilter] = useState("all");
  
  // Placeholder data
  const teams = [
    { 
      id: 1, 
      name: "Crypto Bulls", 
      members: 5, 
      assets: 12,
      winRate: "68%",
      contests: 25,
      totalWinnings: "$15,450"
    },
    { 
      id: 2, 
      name: "Token Titans", 
      members: 4, 
      assets: 8,
      winRate: "72%",
      contests: 18,
      totalWinnings: "$22,780"
    },
    { 
      id: 3, 
      name: "Blockchain Bandits", 
      members: 6, 
      assets: 15,
      winRate: "63%",
      contests: 32,
      totalWinnings: "$19,125"
    },
    { 
      id: 4, 
      name: "DeFi Dragons", 
      members: 3, 
      assets: 10,
      winRate: "55%",
      contests: 20,
      totalWinnings: "$8,900"
    },
    { 
      id: 5, 
      name: "Altcoin Avengers", 
      members: 7, 
      assets: 18,
      winRate: "70%",
      contests: 30,
      totalWinnings: "$27,350"
    },
    { 
      id: 6, 
      name: "NFT Ninjas", 
      members: 4, 
      assets: 14,
      winRate: "65%",
      contests: 23,
      totalWinnings: "$16,750"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeading 
          title="Cryptog Teams" 
          description="Manage cryptocurrency fantasy teams" 
          icon={Users}
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Team
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search teams..."
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all" onClick={() => setTeamFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="active" onClick={() => setTeamFilter("active")}>Active</TabsTrigger>
              <TabsTrigger value="inactive" onClick={() => setTeamFilter("inactive")}>Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Card key={team.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-lg text-primary">{team.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium">{team.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {team.members} members · {team.assets} assets
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-muted/30 rounded">
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="font-medium">{team.winRate}</p>
              </div>
              <div className="p-2 bg-muted/30 rounded">
                <p className="text-xs text-muted-foreground">Contests</p>
                <p className="font-medium">{team.contests}</p>
              </div>
              <div className="p-2 bg-muted/30 rounded">
                <p className="text-xs text-muted-foreground">Winnings</p>
                <p className="font-medium">{team.totalWinnings}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" size="sm">View Members</Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptogTeamsList;
