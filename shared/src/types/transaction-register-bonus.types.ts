import { z } from 'zod';

export const transactionRegisterBonusSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  bonusAmount: z.number(),
  bonusLeftAmount: z.number(),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    playerCode: z.string(),
  }),
  RegisterBonus: z.object({ bonusTitle: z.string() }),
});
export type TransactionRegisterBonusListData = z.infer<
  typeof transactionRegisterBonusSchema
>;
