
import TopPerformingStocks from "./TopPerformingStocks";
import PopularSectors from "./PopularSectors";

const MarketInsights = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TopPerformingStocks />
      <PopularSectors />
    </div>
  );
};

export default MarketInsights;
