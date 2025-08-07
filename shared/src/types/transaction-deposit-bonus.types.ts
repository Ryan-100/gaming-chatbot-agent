import { z } from 'zod';

export const transactionDepositBonusSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  depositAmount: z.number(),
  bonusAmount: z.number(),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    playerCode: z.string(),
  }),
});
export type TransactionDepositBonusListData = z.infer<
  typeof transactionDepositBonusSchema
>;
