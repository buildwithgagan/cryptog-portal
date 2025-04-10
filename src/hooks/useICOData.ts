
import { useState } from "react";

export type ICOStats = {
  totalTokensSold: string;
  totalInvestors: string;
  totalRaised: string;
  currentTokenPrice: string;
  preSaleProgress: number;
  daysRemaining: number;
};

export const useICOData = () => {
  // In a real app, this would fetch from an API
  const [stats] = useState<ICOStats>({
    totalTokensSold: "185.2M",
    totalInvestors: "4,218",
    totalRaised: "$5.4M",
    currentTokenPrice: "$0.029",
    preSaleProgress: 74.1,
    daysRemaining: 18
  });

  const trends = {
    tokensSold: { value: 8.3, isPositive: true },
    investors: { value: 12.7, isPositive: true },
    totalRaised: { value: 7.2, isPositive: true },
    tokenPrice: { value: 2.5, isPositive: true },
  };

  return {
    stats,
    trends
  };
};

export default useICOData;
