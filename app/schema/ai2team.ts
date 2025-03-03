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
  autoAcceptChallenge: boolean;
  isBanned: boolean;
  captainDisplayName: string;
  repolink: string;
  members: { email: string; displayName: string }[];
  memberEmails: string[];
  elo: number;
} 