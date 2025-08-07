export interface WinningGameType {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
  mainGameName: string;
  amount: number;
}
