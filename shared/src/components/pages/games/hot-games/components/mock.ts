import { ChildGameType } from "./types"

export const statusOptions = [
  {
    label: "All",
    value: "All"
  },
  {
    label: "Active",
    value: "Active"
  },
  {
    label: "Inactive",
    value: "Inactive"
  },
]

export const dummyChildGameList: ChildGameType[] = [
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