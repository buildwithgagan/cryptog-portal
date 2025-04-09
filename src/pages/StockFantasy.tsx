
import ComingSoon from "@/components/shared/ComingSoon";
import PageTitle from "@/components/shared/PageTitle";
import { AreaChart } from "lucide-react";

const StockFantasy = () => {
  return (
    <div className="animate-enter">
      <PageTitle 
        title="Stock Fantasy" 
        subtitle="Stock market fantasy gaming platform is coming soon."
      />
      
      <ComingSoon 
        title="Stock Fantasy Platform Coming Soon" 
        description="We're working on an exciting new fantasy stock trading platform that will allow users to test their market prediction skills and compete for prizes."
        icon={AreaChart}
      />
    </div>
  );
};

export default StockFantasy;
