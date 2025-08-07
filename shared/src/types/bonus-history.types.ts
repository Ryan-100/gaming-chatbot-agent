import { z } from 'zod';

export const bonusHistoryByPlayerSchema = z.object({
  id: z.string(),
  amount: z.number(),
  bonusStatus: z.string(),
  createdAt: z.string(),
  expireTime: z.string(),
  bonusType: z.string(),
});

export type BonusHistoryByPlayerListData = z.infer<
  typeof bonusHistoryByPlayerSchema
>;
