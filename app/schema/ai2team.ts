export interface AI2Team {
  id: string;
  name: string;
  // password: string;
  // createdAt: Date;
  // lastSubmitted: Date | null;
  createdAt: { seconds: number; nanoseconds: number };
  lastSubmitted: { seconds: number; nanoseconds: number } | null;
  wins: number;
  losses: number;
  draws: number;
  openToChallenge: boolean;
  isBanned: boolean;
  captainDisplayName: string;
  memberCount: number;
  affiliation: string;
} 