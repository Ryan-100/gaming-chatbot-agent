import { z } from 'zod';
import { depositBonusDetailsSchema, depositBonusSchema, registerBonusDetailsSchema, registerBonusSchema } from "../../../../../src/types/bonus.types";

//depositBonus
export const depositBonusListSchema = depositBonusSchema;

export type DepositBonusData = z.infer<typeof depositBonusListSchema>;

//registerBonus
export const registerBonusListSchema = registerBonusSchema;

export type RegisterBonusData = z.infer<typeof registerBonusListSchema>;

//depositBonusDetails
export const depositBonusDetailsListSchema = depositBonusDetailsSchema;

export type DepositBonusDetailsData = z.infer<typeof depositBonusDetailsListSchema>;

//registerBonusDetails
export const registerBonusDetailsListSchema = registerBonusDetailsSchema;

export type RegisterBonusDetailsData = z.infer<typeof registerBonusDetailsListSchema>;
