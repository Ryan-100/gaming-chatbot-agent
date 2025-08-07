import { z } from 'zod';
import { depositSchema, gameSchema, withdrawSchema, depositBonusSchema, registerBonusSchema, pocketMoneySchema } from "../../../../../src/types/transaction.type";

//deposit
export const depositListSchema = depositSchema;

export type DepositData = z.infer<typeof depositListSchema>;

//withdraw
export const withdrawListSchema = withdrawSchema;

export type WithdrawData = z.infer<typeof withdrawListSchema>;

//game
export const gameListSchema = gameSchema;

export type GameData = z.infer<typeof gameListSchema>;

//depositBonus
export const depositBonusListSchema = depositBonusSchema;

export type DepositBonusData = z.infer<typeof depositBonusListSchema>;

//registerBonus
export const registerBonusListSchema = registerBonusSchema;

export type RegisterBonusData = z.infer<typeof registerBonusListSchema>;

//pocketMoney
export const pocketMoneyListSchema = pocketMoneySchema;

export type PocketMoneyData = z.infer<typeof pocketMoneyListSchema>;