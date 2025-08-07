import { z } from 'zod';

export const depositSchema = z.object({
  id: z.number(),
  player: z.string(),
  playerId: z.string(),
  receivingAccount_url: z.string(),
  receivingAccount: z.string(),
  amount: z.string(),
  pin: z.string(),
  screenshot: z.string(),
  requestedOn: z.string(),
  status: z.string(),
});

export type DepositSchema = z.infer<typeof depositSchema>;
export const depositListSchema = z.array(depositSchema);
export type DepositListSchema = z.infer<typeof depositListSchema>;

export const withdrawSchema = z.object({
  id: z.number(),
  player: z.string(),
  playerId: z.string(),
  receivingAccount_url: z.string(),
  receivingAccount: z.string(),
  amount: z.string(),
  pin: z.string(),
  requestedOn: z.string(),
  status: z.string(),
});

export type WithdrawSchema = z.infer<typeof withdrawSchema>;
export const withdrawListSchema = z.array(withdrawSchema);
export type WithdrawListSchema = z.infer<typeof withdrawListSchema>;

export const gameSchema = z.object({
  id: z.number(),
  player: z.string(),
  playerId: z.string(),
  game: z.string(),
  amount: z.string(),
  inGameAmount: z.string(),
  processState: z.string(),
  requestedOn: z.string(),
  updatedOn: z.string(),
});

export type GameSchema = z.infer<typeof gameSchema>;
export const gameListSchema = z.array(gameSchema);
export type GameListSchema = z.infer<typeof gameListSchema>;


export const depositBonusSchema = z.object({
  id: z.number(),
  player: z.string(),
  playerId: z.string(),
  topupAmount: z.string(),
  bonusAmount: z.string(),
  requestedOn: z.string(),
});

export type DepositBonusSchema = z.infer<typeof depositBonusSchema>;
export const depositBonusListSchema = z.array(depositBonusSchema);
export type DepositBonusListSchema = z.infer<typeof depositBonusListSchema>;


export const registerBonusSchema = z.object({
  id: z.number(),
  description: z.string(),
  player: z.string(),
  playerId: z.string(),
  registerBonus: z.number(),
  lastAmount: z.number(),
  registeredOn: z.string(),
});

export type ReigsterBonusSchema = z.infer<typeof registerBonusSchema>;
export const registerBonusListSchema = z.array(registerBonusSchema);
export type ReigsterBonusListSchema = z.infer<typeof registerBonusListSchema>;


export const pocketMoneySchema = z.object({
  id: z.number(),
  description: z.string(),
  player: z.string(),
  playerId: z.string(),
  pmAmount: z.number(),
  lastAmount: z.number(),
  claimedOn: z.string(),
});

export type PocketMoneySchema = z.infer<typeof pocketMoneySchema>;
export const pocketMoneyListSchema = z.array(pocketMoneySchema);
export type PocketMoneyListSchema = z.infer<typeof pocketMoneyListSchema>;
