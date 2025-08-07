export interface UserType {
  name: string;
  ph: string;
}

export interface WinnersType {
  id: number;
  sortNo: number;
  childGameName: string;
  mainGameName: string;
  user: UserType;
  amount: number;
}
