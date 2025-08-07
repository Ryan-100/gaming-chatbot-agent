

export interface Result {
  name: string,
  qty: {
    in: number,
    out: number,
  },
  amt: {
    in: number,
    out: number,
  }
  result: number,
}