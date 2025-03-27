
import ComingSoon from "@/components/shared/ComingSoon";
import PageTitle from "@/components/shared/PageTitle";

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
      />
    </div>
  );
};

export default StockFantasy;
