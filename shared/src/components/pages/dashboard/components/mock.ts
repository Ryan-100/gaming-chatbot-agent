import { PopularGameType, WinnerType, WinningGameType } from "./types";

export const dummyMetaData = {
  player: 4500,
  balance: {
    deposit: 500000,
    withdraw: 100000,
  },
  mainGame: 10,
  currency: {
    icon: "/upload/images/temp.png",
    unit: "TBH",
    label: "Thai Bath"
  }
}


export const dummyWinnerList: WinnerType[] = [
  {
    id: "id 1",
    userName: "Sun",
    childGameName: "MLBB",
    mainGameName: "Moonton",
    winAmount: 32000,
  },
  {
    id: "id 2",
    userName: "Moon",
    childGameName: "COC",
    mainGameName: "Supercell",
    winAmount: 500000,
  },
]


export const dummyPopularGameList: PopularGameType[] = [
  {
    name: "Mario",
    status: "Active",
    mainGameName: "Childhood",
  },
  {
    name: "MLBB",
    status: "Inactive",
    mainGameName: "Moonton",
  },
  {
    name: "LOL",
    status: "Active",
    mainGameName: "chinland",
  },
  {
    name: "HOK",
    status: "Inactive",
    mainGameName: "HKK",
  },
  {
    name: "AOV",
    status: "Active",
    mainGameName: "America",
  },
]

export const dummyWinningGameList: WinningGameType[] = [
  {
    name: "Mario",
    status: "Active",
    mainGameName: "Childhood",
    amount: 10000,
  },
  {
    name: "MLBB",
    status: "Inactive",
    mainGameName: "Moonton",
    amount: 40000,
  },
  {
    name: "LOL",
    status: "Active",
    mainGameName: "chinland",
    amount: 30000,
  },
  {
    name: "HOK",
    status: "Inactive",
    mainGameName: "HKK",
    amount: 50000,
  },
  {
    name: "AOV",
    status: "Active",
    mainGameName: "America",
    amount: 20000,
  },
]