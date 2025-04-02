
export interface Team {
  id: string;
  name: string;
}

export interface Contest {
  id: string;
  name: string;
  teamA: Team;
  teamB: Team;
  joiningFee: number;
  winningPrize: number;
}
