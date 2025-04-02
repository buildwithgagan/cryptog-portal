
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";

interface ContestHeaderProps {
  onCreateContest: () => void;
}

const ContestHeader = ({ onCreateContest }: ContestHeaderProps) => {
  return (
    <>
      <PageTitle
        title="Manage Cryptog Contests"
        subtitle="Create and manage cryptocurrency fantasy contests"
      />

      <div className="flex justify-between items-center">
        <SectionHeading
          title="Contest List"
          description="All created crypto fantasy contests"
        />
        <Button onClick={onCreateContest} className="mb-4">
          <Plus className="mr-2 h-4 w-4" /> Create Contest
        </Button>
      </div>
    </>
  );
};

export default ContestHeader;
