
import { ContestData } from "../types/contestTypes";

/**
 * Mock data for contest overview
 */
export const contestData: ContestData = {
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
