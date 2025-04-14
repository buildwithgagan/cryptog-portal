
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/shared/SectionHeading";
import { contestData } from "./data/contestData";
import UpcomingContestsTab from "./contests/UpcomingContestsTab";
import OngoingContestsTab from "./contests/OngoingContestsTab";
import CompletedContestsTab from "./contests/CompletedContestsTab";

const ContestOverview = () => {
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
          <UpcomingContestsTab contests={contestData.upcoming} />
        </TabsContent>
        
        <TabsContent value="ongoing" className="mt-4">
          <OngoingContestsTab contests={contestData.ongoing} />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <CompletedContestsTab contests={contestData.completed} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ContestOverview;
