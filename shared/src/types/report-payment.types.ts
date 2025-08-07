import { z } from 'zod';

export const accountListSchema = z.object({
  levelName: z.string(),
  accountNumber: z.string(),
  paymentMethod: z.string(),
  totalCount: z.number(),
  totalAmount: z.number(),
});

export type AccountListData = z.infer<typeof accountListSchema>;

export const reportPaymentSchema = z.object({
  totalWithdrawalAmount: z.number(),
  totalDepositAmount: z.number(),
  accountList: z.array(accountListSchema),
});

export type ReportPaymentData = z.infer<typeof reportPaymentSchema>;
