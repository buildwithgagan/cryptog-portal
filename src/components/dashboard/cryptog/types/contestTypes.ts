
/**
 * Contest data types for the dashboard
 */

export interface UpcomingContest {
  id: number;
  name: string;
  startDate: string;
  prize: string;
  participants: number;
  slots: number;
}

export interface OngoingContest {
  id: number;
  name: string;
  endDate: string;
  prize: string;
  participants: number;
  ctgCollected: number;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface CompletedContest {
  id: number;
  name: string;
  endDate: string;
  prize: string;
  participants: number;
  winner: string;
  status: "Declared" | "Pending";
}

export interface ContestData {
  upcoming: UpcomingContest[];
  ongoing: OngoingContest[];
  completed: CompletedContest[];
}
