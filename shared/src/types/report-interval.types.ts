import { z } from 'zod';

const gameTransactionSchema = z.object({
  players: z.object({
    in: z.number(),
    out: z.number(),
  }),
  amount: z.object({
    in: z.number(),
    out: z.number(),
    difference: z.number(),
  }),
  winLose: z.object({
    status: z.string(),
    percent: z.string(),
    value: z.number(),
  }),
});

const mainGameSchema = z.object({
  id: z.number(),
  game_name: z.string(),
  p_code: z.string(),
});

const gameItemSchema = z.object({
  mainGame: mainGameSchema,
  qtyIn: z.number(),
  qtyOut: z.number(),
  amountIn: z.number(),
  amountOut: z.number(),
  winAndLose: z.number(),
});

export type GameReportData = z.infer<typeof gameItemSchema>;

const intervalReportSchema = z.object({
  gameTransaction: gameTransactionSchema,
  games: z.array(gameItemSchema),
  newUserCount: z.number(),
  newUserDeposit: z.number(),
  newUserWithdraw: z.number(),
  totalDepositAmount: z.number(),
  totalDepositCount: z.number(),
  totalWithdrawAmount: z.number(),
  totalWithdrawCount: z.number(),
  differentCount: z.number(),
  differentAmount: z.number(),
});

export type IntervalReportData = z.infer<typeof intervalReportSchema>;
