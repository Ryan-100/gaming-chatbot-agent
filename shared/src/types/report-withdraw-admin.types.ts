import { z } from 'zod';

export const reportWithdrawAdminFiatSchema = z.object({
  adminId: z.string(),
  adminName: z.string(),
  paymentMethod: z.string(),
  acceptedCount: z.number(),
  acceptedAmount: z.number(),
});
export type ReportWithdrawAdminFiatListData = z.infer<
  typeof reportWithdrawAdminFiatSchema
>;

export const reportWithdrawAdminCryptoSchema = z.object({
  adminId: z.string(),
  adminName: z.string(),
  paymentMethod: z.string(),
  acceptedCount: z.number(),
  acceptedAmount: z.number(),
  acceptedUsdt: z.number(),
});
export type ReportWithdrawAdminCryptoListData = z.infer<
  typeof reportWithdrawAdminCryptoSchema
>;

export const reportWithdrawAdminSchema = z.object({
  cryptoAdminList: z.array(reportWithdrawAdminCryptoSchema),
  fiatAdminList: z.array(reportWithdrawAdminFiatSchema),
});
export type ReportWithdrawAdminData = z.infer<typeof reportWithdrawAdminSchema>;

export const transactionListSchema = z.object({
  id: z.string(),
  transactionId: z.string(),
  amount: z.number(),
  exchangeRateId: z.null(),
  transferedAmount: z.number(),
  status: z.string(),
  createdAt: z.string(),
  usdt: z.number(),
  isCrypto: z.boolean(),
  transactionNumber: z.string(),
});

export type TransactionListData = z.infer<typeof transactionListSchema>;

export const reportWithdrawAdminDetailSchema = z.object({
  adminData: z.object({
    acceptedDataList: z.array(
      z.object({
        acceptedCount: z.number(),
        acceptedAmount: z.number(),
        acceptedUsdt: z.number(),
      })
    ),
    rejectedDataList: z.array(
      z.object({
        rejectedCount: z.number(),
        rejectedAmount: z.number(),
        rejectedUsdt: z.number(),
      })
    ),
    pendingDataList: z.array(
      z.object({
        pendingCount: z.number(),
        pendingAmount: z.number(),
        pendingUsdt: z.number(),
      })
    ),
    totalDataList: z.array(
      z.object({
        totalCount: z.number(),
        totalAmount: z.number(),
        totalUsdt: z.number(),
      })
    ),
  }),
  transactionList: z.array(transactionListSchema),
});

export type ReportWithdrawAdminDetailData = z.infer<
  typeof reportWithdrawAdminDetailSchema
>;

export const reportWithdrawAdminTransactionSchema = z.object({
  id: z.string(),
  Player: z.object({ name: z.string(), phone: z.string(), email: z.string() }),
  updatedAt: z.string(),
});
export type ReportWithdrawAdminTransactionData = z.infer<
  typeof reportWithdrawAdminTransactionSchema
>;
