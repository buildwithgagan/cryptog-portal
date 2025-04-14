
import { Team, Contest } from "../types";

/**
 * Mock data for teams and contests
 */

// Mock teams data
export const getMockTeams = (): Team[] => [
  { id: "1", name: "Bullish Titans 🐂🔥" },
  { id: "2", name: "Moonshot Mavericks 🚀💰" },
  { id: "3", name: "Diamond Hands Crew 💎✋" },
  { id: "4", name: "Blockchain Bandits ⛓️🏴‍☠️" },
  { id: "5", name: "Crypto Crusaders ⚔️🪙" },
  { id: "6", name: "DeFi Dominators 🏆📈" },
  { id: "7", name: "HODL Heroes 🦸‍♂️📊" },
  { id: "8", name: "Altcoin Avengers ⚡🛡️" },
];

// Generate example contests
export const generateExampleContests = (teams: Team[]): Contest[] => {
  // Add one day and one week to current date for example start and end dates
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  return [
    {
      id: "1",
      name: "Ultimate Crypto Showdown",
      teamA: teams[0],
      teamB: teams[1],
      joiningFee: 100,
      winningPrize: 200000,
      startDateTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // Tomorrow + 2 hours
      endDateTime: new Date(nextWeek.getTime() + 5 * 60 * 60 * 1000), // Next week + 5 hours
    },
    {
      id: "2",
      name: "Blockchain Battle Royale",
      teamA: teams[2],
      teamB: teams[3],
      joiningFee: 500,
      winningPrize: 1000000,
      startDateTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000), // Tomorrow + 4 hours
      endDateTime: new Date(nextWeek.getTime() + 10 * 60 * 60 * 1000), // Next week + 10 hours
    },
    {
      id: "3",
      name: "DeFi Duel Championship",
      teamA: teams[4],
      teamB: teams[5],
      joiningFee: 250,
      winningPrize: 500000,
      startDateTime: new Date(tomorrow.getTime() + 6 * 60 * 60 * 1000), // Tomorrow + 6 hours
      endDateTime: new Date(nextWeek.getTime() + 12 * 60 * 60 * 1000), // Next week + 12 hours
    },
    {
      id: "4",
      name: "NFT Warriors Challenge",
      teamA: teams[6],
      teamB: teams[7],
      joiningFee: 150,
      winningPrize: 300000,
      startDateTime: new Date(tomorrow.getTime() + 8 * 60 * 60 * 1000), // Tomorrow + 8 hours
      endDateTime: new Date(nextWeek.getTime() + 14 * 60 * 60 * 1000), // Next week + 14 hours
    },
    {
      id: "5",
      name: "Whale Traders Showdown",
      teamA: teams[0],
      teamB: teams[3],
      joiningFee: 750,
      winningPrize: 1500000,
      startDateTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000), // Tomorrow + 10 hours
      endDateTime: new Date(nextWeek.getTime() + 16 * 60 * 60 * 1000), // Next week + 16 hours
    },
    {
      id: "6",
      name: "Metaverse Masters Cup",
      teamA: teams[2],
      teamB: teams[5],
      joiningFee: 300,
      winningPrize: 600000,
      startDateTime: new Date(tomorrow.getTime() + 12 * 60 * 60 * 1000), // Tomorrow + 12 hours
      endDateTime: new Date(nextWeek.getTime() + 18 * 60 * 60 * 1000), // Next week + 18 hours
    },
    {
      id: "7",
      name: "Web3 Wizards Tournament",
      teamA: teams[1],
      teamB: teams[4],
      joiningFee: 450,
      winningPrize: 900000,
      startDateTime: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // Tomorrow + 14 hours
      endDateTime: new Date(nextWeek.getTime() + 20 * 60 * 60 * 1000), // Next week + 20 hours
    },
    {
      id: "8",
      name: "DeFi Dragons Derby",
      teamA: teams[6],
      teamB: teams[3],
      joiningFee: 200,
      winningPrize: 400000,
      startDateTime: new Date(tomorrow.getTime() + 16 * 60 * 60 * 1000), // Tomorrow + 16 hours
      endDateTime: new Date(nextWeek.getTime() + 22 * 60 * 60 * 1000), // Next week + 22 hours
    },
  ];
};
