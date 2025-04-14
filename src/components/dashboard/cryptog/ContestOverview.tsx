
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionHeading from "@/components/shared/SectionHeading";

// Contest data types
interface UpcomingContest {
  id: number;
  name: string;
  startDate: string;
  prize: string;
  participants: number;
  slots: number;
}

interface OngoingContest {
  id: number;
  name: string;
  endDate: string;
  prize: string;
  participants: number;
  ctgCollected: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface CompletedContest {
  id: number;
  name: string;
  endDate: string;
  prize: string;
  participants: number;
  winner: string;
  status: "Declared" | "Pending";
}

interface ContestData {
  upcoming: UpcomingContest[];
  ongoing: OngoingContest[];
  completed: CompletedContest[];
}

// Contest data mocks
const contestData: ContestData = {
  upcoming: [
    { id: 1, name: "Crypto Masters", startDate: "Jul 18, 2023", prize: "$25,000", participants: 450, slots: 150 },
    { id: 2, name: "Bitcoin Challenge", startDate: "Jul 20, 2023", prize: "$10,000", participants: 320, slots: 80 },
    { id: 3, name: "Altcoin Showdown", startDate: "Jul 23, 2023", prize: "$15,000", participants: 280, slots: 120 },
  ],
  ongoing: [
    { id: 4, name: "Ethereum League", endDate: "Jul 15, 2023", prize: "$30,000", participants: 620, ctgCollected: 18600, timeLeft: { hours: 6, minutes: 24, seconds: 18 } },
    { id: 5, name: "Crypto Cup 2023", endDate: "Jul 17, 2023", prize: "$50,000", participants: 890, ctgCollected: 26700, timeLeft: { hours: 24, minutes: 15, seconds: 42 } },
  ],
  completed: [
    { id: 6, name: "DeFi Tournament", endDate: "Jul 10, 2023", prize: "$20,000", participants: 540, winner: "Team Alpha", status: "Declared" },
    { id: 7, name: "NFT Championship", endDate: "Jul 08, 2023", prize: "$15,000", participants: 320, winner: "Team Omega", status: "Declared" },
    { id: 8, name: "Stablecoin Derby", endDate: "Jul 05, 2023", prize: "$12,000", participants: 280, winner: "Team Genesis", status: "Pending" },
  ]
};

const ContestOverview = () => {
  // State for time counters
  const [timeLeft, setTimeLeft] = useState(contestData.ongoing.map(contest => contest.timeLeft));
  
  // Update ongoing contest timers
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimes => 
        prevTimes.map(time => {
          let { hours, minutes, seconds } = time;
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
          return { hours, minutes, seconds };
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-5">
      <SectionHeading 
        title="Contest Overview" 
        description="Summary of all platform contests"
      />
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contest Name</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Teams Registered</TableHead>
                  <TableHead>Slots Left</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contestData.upcoming.map((contest) => (
                  <TableRow key={contest.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{contest.name}</TableCell>
                    <TableCell>{contest.startDate}</TableCell>
                    <TableCell>{contest.participants}</TableCell>
                    <TableCell>{contest.slots}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="ongoing" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contest Name</TableHead>
                  <TableHead>Live Timer</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>CTG Collected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contestData.ongoing.map((contest, index) => (
                  <TableRow key={contest.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{contest.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-primary">
                        <Clock className="mr-2 h-4 w-4" />
                        {`${timeLeft[index].hours.toString().padStart(2, '0')}:${timeLeft[index].minutes.toString().padStart(2, '0')}:${timeLeft[index].seconds.toString().padStart(2, '0')}`}
                      </div>
                    </TableCell>
                    <TableCell>{contest.participants}</TableCell>
                    <TableCell>{contest.ctgCollected.toLocaleString()} CTG</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contest Name</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead>Result Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contestData.completed.map((contest) => (
                  <TableRow key={contest.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{contest.name}</TableCell>
                    <TableCell>{contest.participants}</TableCell>
                    <TableCell>{contest.prize}</TableCell>
                    <TableCell>{contest.winner}</TableCell>
                    <TableCell>
                      {contest.status === "Declared" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Declared
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContestOverview;
