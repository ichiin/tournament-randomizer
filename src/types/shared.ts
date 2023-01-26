export interface GameType {
  id: number;
  standings: StandingType[];
}

export interface GroupType {
  games: GameType[];
  id: number;
  name: string;
  standings: StandingType[];
}

export interface PointPlayerType {
  id: number;
  kill_point: number;
  kill_point_multiplier: number;
  rank: number;
  rank_point: number;
}

export interface StandingType {
  killCount?: number;
  playerName: string;
  rank?: number;
  score: number;
  teamId?: number;
  totalHurt?: number;
}

export interface TournamentType {
  format?: string;
  groups?: GroupType[];
  id?: number;
  mode?: string;
  name?: string;
  pointSystem?: PointPlayerType[];
  standings?: StandingType[];
  status?: string;
}
