import { z } from 'zod';

export const transactionPocketMoneySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  bonusAmount: z.number(),
  bonusLeftAmount: z.number(),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    playerCode: z.string(),
  }),
  PocketMoney: z.object({ title: z.string() }),
});
export type TransactionPocketMoneyListData = z.infer<
  typeof transactionPocketMoneySchema
>;
