import { z } from 'zod';

export const withdrawAdminTransactionSchema = z.object({
  id: z.number(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
});

export type WithdrawAdminTransaction = z.infer<
  typeof withdrawAdminTransactionSchema
>;
