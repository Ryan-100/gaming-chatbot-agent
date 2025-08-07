

export interface WinnerType {
  id: string,
  userName: string,
  childGameName: string,
  mainGameName: string,
  winAmount: number
}

export interface PopularGameType {
  name: string,
  status: "Active" | "Inactive",
  mainGameName: string,
}

export interface WinningGameType {
  name: string,
  status: "Active" | "Inactive",
  mainGameName: string,
  amount: number,
}