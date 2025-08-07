import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';

export const spinSettingSchema = z.object({
  id: z.string(),
  winChance: z.number(),
  maxSpinLimit: z.number(),
  bonusExpireDate: z.number(),
  turnOverRate: z.number(),
  status: StatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  bonusExpireType: z.string(),
});

export type SpinSettingData = z.infer<typeof spinSettingSchema>;

export const updateSpinSettingSchema = spinSettingSchema.pick({
  winChance: true,
  maxSpinLimit: true,
  bonusExpireDate: true,
  turnOverRate: true,
  bonusExpireType: true,
}).extend({
  winChance: z.number().int({ message: 'Win Chance is Required' }),
  maxSpinLimit: z.number().int({ message: 'Maximum Spin Limit is Required' }),
  bonusExpireDate: z.number().int({ message: 'Please set Expire Date' }),
  turnOverRate: z.number().int({ message: 'Please set Turnover Rate' }),
  bonusExpireType: z.string({ message: 'Please set Expire Unit' }),
});

export type UpdateSpinSettingForm = z.infer<typeof updateSpinSettingSchema>;
