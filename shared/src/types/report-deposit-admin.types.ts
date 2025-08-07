import { z } from 'zod';

export const reportDepositAdminFiatSchema = z.object({
  adminId: z.string(),
  adminName: z.string(),
  paymentMethod: z.string(),
  acceptedCount: z.number(),
  acceptedAmount: z.number(),
});
export type ReportDepositAdminFiatListData = z.infer<
  typeof reportDepositAdminFiatSchema
>;

export const reportDepositAdminCryptoSchema = z.object({
  adminId: z.string(),
  adminName: z.string(),
  paymentMethod: z.string(),
  acceptedCount: z.number(),
  acceptedAmount: z.number(),
  acceptedUsdt: z.number(),
});
export type ReportDepositAdminCryptoListData = z.infer<
  typeof reportDepositAdminCryptoSchema
>;

export const reportDepositAdminSchema = z.object({
  cryptoAdminList: z.array(reportDepositAdminCryptoSchema),
  fiatAdminList: z.array(reportDepositAdminFiatSchema),
});
export type ReportDepositAdminData = z.infer<typeof reportDepositAdminSchema>;

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

export const reportDepositAdminDetailSchema = z.object({
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

export type ReportDepositAdminDetailData = z.infer<
  typeof reportDepositAdminDetailSchema
>;

export const reportDepositAdminTransactionSchema = z.object({
  id: z.string(),
  Player: z.object({ name: z.string(), phone: z.string(), email: z.string() }),
  updatedAt: z.string(),
});
export type ReportDepositAdminTransactionData = z.infer<
  typeof reportDepositAdminTransactionSchema
>;
