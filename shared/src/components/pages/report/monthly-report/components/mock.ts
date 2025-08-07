import { Result } from "./types"

export const dummyUserData = [
  {
    title: "New User",
    amount: 10,
  },
  {
    title: "Deposit for new users",
    amount: 5000,
  },
  {
    title: "Withdraw for new users",
    amount: 3000,
  },
]

export const dummyGameData = [
  {
    title: "Go In",
    payer: 5,
    amount: 10000,
  },
  {
    title: "Go Out",
    payer: 6,
    amount: 10000,
  },
  {
    title: "Net Win/Lose",
    payer: "",
    amount: 10000,
  },
]

export const dummyBalanceData = [
  {
    title: "Deposit",
    amount: "1/100"
  },
  {
    title: "Withdraw",
    amount: "0/0"
  },
  {
    title: "Deposit",
    amount: "1/1000"
  },
]

export const dummyResult: Result[] = [
  {
    name: "MLBB",
    qty: {
      in: 1,
      out: 1,
    },
    amt: {
      in: 20000,
      out: 20000,
    },
    result: 0
  },
  {
    name: "PUBG",
    qty: {
      in: 1,
      out: 1,
    },
    amt: {
      in: 10000,
      out: 20000,
    },
    result: -10000
  },
] 