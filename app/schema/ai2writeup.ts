export interface AI2Writeup {
  id: string;
  team: string;
  status: 'uploading/verifying' | 'pending' | 'failed' | 'accepted';
  statusCode: number;
  createdAt: { seconds: number; nanoseconds: number };
  filename: string;
}