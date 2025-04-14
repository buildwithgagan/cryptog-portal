
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contestData = {
  upcoming: [
    { id: 1, name: "Wall Street Titans", startDate: "Jul 22, 2023", prize: "$15,000", participants: 380 },
    { id: 2, name: "Bull vs Bear", startDate: "Jul 25, 2023", prize: "$12,000", participants: 290 },
  ],
  ongoing: [
    { id: 3, name: "Market Masters", endDate: "Jul 18, 2023", prize: "$20,000", participants: 420 },
    { id: 4, name: "Dividend Derby", endDate: "Jul 20, 2023", prize: "$18,000", participants: 350 },
  ],
};

const ContestStatus = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Contest Status" 
        description="Stock fantasy contests overview"
      />
      
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing" className="mt-4">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Contest Name</th>
                  <th>End Date</th>
                  <th>Prize Pool</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
                {contestData.ongoing.map((contest) => (
                  <tr key={contest.id} className="hover:bg-muted/50">
                    <td className="font-medium">{contest.name}</td>
                    <td>{contest.endDate}</td>
                    <td>{contest.prize}</td>
                    <td>{contest.participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="mt-4">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Contest Name</th>
                  <th>Start Date</th>
                  <th>Prize Pool</th>
                  <th>Participants</th>
                </tr>
              </thead>
              <tbody>
                {contestData.upcoming.map((contest) => (
                  <tr key={contest.id} className="hover:bg-muted/50">
                    <td className="font-medium">{contest.name}</td>
                    <td>{contest.startDate}</td>
                    <td>{contest.prize}</td>
                    <td>{contest.participants}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContestStatus;
