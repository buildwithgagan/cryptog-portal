
import { Separator } from "@/components/ui/separator";
import InvestorsHeader from "@/components/ico/InvestorsHeader";
import InvestorsSearch from "@/components/ico/InvestorsSearch";
import InvestorsList from "@/components/ico/InvestorsList";
import InvestorsPagination from "@/components/ico/InvestorsPagination";
import InvestorStats from "@/components/ico/InvestorStats";

const ICOInvestors = () => {
  return (
    <div className="space-y-6">
      <InvestorsHeader />
      
      <Separator />
      
      <InvestorsSearch>
        <InvestorsList />
      </InvestorsSearch>
      
      <InvestorsPagination />
      
      <InvestorStats />
    </div>
  );
};

export default ICOInvestors;
