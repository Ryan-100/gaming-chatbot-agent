import { z } from 'zod';
import { fileSchema } from './file-upload.types';
import { paymentCategorySchema } from './payment-category.types';
import { playerPaymentSchema } from './player-payment.types';

export const categoryReportSchema = z.object({
  categoryId: z.string(),
  categoryName: z.string(),
  depositCount: z.number(),
  depositUsdt: z.number(),
  withdrawalCount: z.number(),
  withdrawalUsdt: z.number(),
});
export type CategoryReportListData = z.infer<typeof categoryReportSchema>;

export const networkReportSchema = z.object({
  networkId: z.string(),
  networkName: z.string(),
  depositCount: z.number(),
  depositUsdt: z.number(),
  withdrawalCount: z.number(),
  withdrawalUsdt: z.number(),
});
export type NetworkReportListData = z.infer<typeof networkReportSchema>;

export const reportCryptoSchema = z.object({
  totalDepositCount: z.number(),
  totalDepositUsdt: z.number(),
  totalWithdrawalCount: z.number(),
  totalWithdrawalUsdt: z.number(),
  difference: z.number(),
  categoryReport: z.array(categoryReportSchema),
  networkReport: z.array(networkReportSchema),
});
export type ReportCryptoData = z.infer<typeof reportCryptoSchema>;

// detail page
export const depositReportSchema = z.object({
  accountId: z.string(),
  image: z.string(),
  categoryName: z.string(),
  networkName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  memo: z.string(),
  paymentName: z.string(),
  txnType: z.string(),
  txnCount: z.number(),
  txnUsdt: z.string(),
  txnAmount: z.string(),
});
export type DepositReportListData = z.infer<typeof depositReportSchema>;

export const withdrawReportSchema = depositReportSchema;
export type WithdrawReportListData = z.infer<typeof withdrawReportSchema>;

export const reportCryptoByCategorySchema = z.object({
  depositReport: z.array(depositReportSchema),
  withdrawalReport: z.array(withdrawReportSchema),
});
export type ReportCryptoByCategoryData = z.infer<
  typeof reportCryptoByCategorySchema
>;

// step 2 detail page
export const depositAccountSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  status: z.string(),
  amount: z.number(),
  transactionId: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  imageId: z.string(),
  approvedBy: z.string(),
  reason: z.string(),
  exchangeRateId: z.string(),
  transferedAmount: z.number(),
  depositBonusId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    playerCode: z.string(),
    PlayerLevel: z.object({
      id: z.string(),
      name: z.string(),
      rank: z.string(),
      status: z.string(),
      imageId: z.string(),
      description: z.string(),
      order: z.number(),
      minDeposit: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  }),
  PaymentAccount: z.object({
    accountName: z.string(),
    accountNumber: z.string(),
    memo: z.string(),
  }),
  PaymentCategory: paymentCategorySchema,
  ApprovedAdmin: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    Image: z.string(),
  }),
  Image: fileSchema,
});
export type DepositAccountListData = z.infer<typeof depositAccountSchema>;

export const withdrawAccountSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
  status: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  approvedBy: z.string(),
  signature: z.string(),
  reason: z.string(),
  exchangeRateId: z.string(),
  receiveableAmount: z.number(),
  holdingWithdrawBalance: z.number(),
  holdingWithdrawBonus: z.number(),
  holdingWithdrawAbleDepo: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  ApprovedAdmin: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    Image: z.string(),
  }),
  PaymentAccount: z.object({ cryptoNetworkId: z.string() }),
  Player: z.object({
    id: z.string(),
    name: z.string(),
    playerCode: z.string(),
    PlayerPaymentAccount: playerPaymentSchema,
  }),
});
export type WithdrawAccountListData = z.infer<typeof withdrawAccountSchema>;
