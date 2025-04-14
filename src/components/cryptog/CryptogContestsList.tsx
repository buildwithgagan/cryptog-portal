
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { ArrowUpDown, Filter, Plus, Search, Trophy } from "lucide-react";
import { useState } from "react";

const CryptogContestsList = () => {
  const [filter, setFilter] = useState("all");

  // Placeholder data
  const contests = [
    { 
      id: 1, 
      name: "Spring Crypto Championship", 
      teamA: "Bullish Bears", 
      teamB: "Crypto Kings",
      startDate: "2023-04-15",
      endDate: "2023-04-22",
      prize: "$10,000",
      participants: 128,
      status: "confirmed" as const
    },
    { 
      id: 2, 
      name: "Summer Blockchain Battle", 
      teamA: "Token Titans", 
      teamB: "DeFi Dragons",
      startDate: "2023-05-01",
      endDate: "2023-05-08",
      prize: "$15,000",
      participants: 256,
      status: "pending" as const
    },
    { 
      id: 3, 
      name: "Crypto Cup 2023", 
      teamA: "Altcoin Avengers", 
      teamB: "Mining Mavericks",
      startDate: "2023-06-10",
      endDate: "2023-06-17",
      prize: "$25,000",
      participants: 312,
      status: "confirmed" as const
    },
    { 
      id: 4, 
      name: "Blockchain Bonanza", 
      teamA: "NFT Ninjas", 
      teamB: "Staking Stars",
      startDate: "2023-03-05",
      endDate: "2023-03-12",
      prize: "$8,000",
      participants: 96,
      status: "rejected" as const
    },
    { 
      id: 5, 
      name: "DeFi Duel Championship", 
      teamA: "Yield Yetis", 
      teamB: "Liquidity Lords",
      startDate: "2023-07-20",
      endDate: "2023-07-27",
      prize: "$20,000",
      participants: 248,
      status: "pending" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeading 
          title="Cryptog Contests" 
          description="Manage cryptocurrency fantasy contests" 
          icon={Trophy}
        />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Contest
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contests..."
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="pending" onClick={() => setFilter("pending")}>Pending</TabsTrigger>
              <TabsTrigger value="active" onClick={() => setFilter("active")}>Active</TabsTrigger>
              <TabsTrigger value="ended" onClick={() => setFilter("ended")}>Ended</TabsTrigger>
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

      <div className="space-y-4">
        {contests.map((contest) => (
          <Card key={contest.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contest.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {contest.teamA} vs {contest.teamB}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="min-w-[120px]">
                  <p className="text-xs text-muted-foreground">Start - End Date</p>
                  <p className="text-sm font-medium">
                    {contest.startDate} - {contest.endDate}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Prize Pool</p>
                  <p className="text-sm font-medium">{contest.prize}</p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <p className="text-sm font-medium">{contest.participants}</p>
                </div>
                
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <StatusBadge status={contest.status} />
                </div>
                
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptogContestsList;
