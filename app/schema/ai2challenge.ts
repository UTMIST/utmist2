export interface AI2Challenge {
  id: string;
  team1: string;
  team2: string;
  code: string;
  status: 'pending' | 'ongoing' | 'complete';
  createdAt: Date;
  videoUrl: string | null;
  result: string | null;
  entryName?: string;
  opponentEntryName?: string;
} 