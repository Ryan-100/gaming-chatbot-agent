import { z } from 'zod';
import { exchangeRateSchema } from './exchange-rete.types';

export const withdrawReportSchema = z.object({
  date: z.string(),
  acceptedCount: z.number(),
  totalAcceptedAmount: z.number(),
  acceptedUsdt: z.number(),
  rejectedCount: z.number(),
  totalRejectedAmount: z.number(),
  rejectedUsdt: z.number(),
});

export type WithdrawReportListData = z.infer<typeof withdrawReportSchema>;

export const withdrawReportDetailSchema = z.object({
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
  ExchangeRate: exchangeRateSchema,
  Player: z.object({
    PlayerPaymentAccount: z.object({
      id: z.string(),
      playerId: z.string(),
      accountName: z.string(),
      accountnumber: z.string(),
      paymentCategoryId: z.string(),
      cryptoNetworkId: z.string(),
      accountCanUpdate: z.string(),
      memo: z.string(),
      status: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      CryptoNetwork: z.object({
        id: z.string(),
        name: z.string(),
        requireMemo: z.boolean(),
        createdById: z.string(),
        updatedById: z.string(),
        status: z.string(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    }),
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  PaymentAccount: z.object({
    accountName: z.string(),
    accountNumber: z.string(),
    CryptoNetwork: z.object({
      id: z.string(),
      name: z.string(),
      requireMemo: z.boolean(),
      createdById: z.string(),
      updatedById: z.string(),
      status: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  }),
});
export type WithdrawReportDetailListData = z.infer<
  typeof withdrawReportDetailSchema
>;
