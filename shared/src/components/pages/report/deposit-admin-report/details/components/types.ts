import { z } from 'zod';

export const depositAdminTransactionSchema = z.object({
  id: z.number(),
  trxNum: z.string(),
  amount: z.number(),
  status: z.string(),
  date: z.string(),
  toAccNo: z.string(),
  manual: z.string(),
});

export type DepositAdminTransaction = z.infer<
  typeof depositAdminTransactionSchema
>;
