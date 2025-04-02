
export interface Asset {
  id: string;
  name: string;
  icon: JSX.Element;
  creditRequired: number;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: Asset[];
}

export const TEAM_NAME_SUGGESTIONS = [
  "Bullish Titans 🐂🔥",
  "Moonshot Mavericks 🚀💰",
  "Diamond Hands Crew 💎✋",
  "Blockchain Bandits ⛓️🏴‍☠️",
  "Crypto Crusaders ⚔️🪙",
  "DeFi Dominators 🏆📈",
  "HODL Heroes 🦸‍♂️📊",
  "Altcoin Avengers ⚡🛡️",
  "Whale Warriors 🐋⚔️",
  "Pump & Hold Legends 📊🚀",
];
