import { z } from 'zod';
import { playerLevelSchema } from './player-level.types';
import { spinSettingSchema } from './spin-setting.types';
import { spinBonusSchema } from './spin-bonus.types';

export const spinHistorySchema = z.object({
  createdAtDate: z.string(),
  total_amount: z.number(),
  total_count: z.number(),
});

export type SpinHistoryListData = z.infer<typeof spinHistorySchema>;

export const dailySpinHistorySchema = z.object({
  id: z.string(),
  bonusAmount: z.number(),
  bonusLeftAmount: z.number(),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    PlayerLevel: playerLevelSchema,
  }),
  createdAt: z.string(),
});

export type DailySpinHistoryListData = z.infer<typeof dailySpinHistorySchema>;

export const spinHistorySettingSchema = z.object({
  SpinSetting: spinSettingSchema,
  spinItems: z.array(spinBonusSchema),
});

export type SpinHistorySettingData = z.infer<typeof spinHistorySettingSchema>;
