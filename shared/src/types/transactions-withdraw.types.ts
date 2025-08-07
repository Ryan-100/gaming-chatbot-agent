import { z } from 'zod';
import { playerPaymentSchema } from './player-payment.types';
import { paymentCategorySchema } from './payment-category.types';
import { paymentManagementSchema } from './payment-management.types';

export const transactionsWithdrawSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
  receiveableAmount: z.number(),
  status: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  approvedBy: z.null(),
  signature: z.string(),
  reason: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  Player: z.object({
    PlayerPaymentAccount: playerPaymentSchema,
    id: z.string(),
    name: z.string(),
    playerCode: z.null(),
  }),
});

export type TransactionsWithdrawListData = z.infer<
  typeof transactionsWithdrawSchema
>;

export const transactionWithdrawDetailSchema = z.object({
  topupWithdraw: z.object({
    totalTopupCount: z.number(),
    totalTopupAmount: z.number(),
    totalTopupUsdtCount: z.number(),
    totalTopupUsdt: z.number(),
    totalTopupOneMonthCount: z.number(),
    totalTopupOneMonthAmount: z.number(),
    totalTopupOneMonthUsdtCount: z.number(),
    totalTopupOneMonthUsdt: z.number(),
    totalWithdrawalCount: z.number(),
    totalWithdrawalAmount: z.number(),
    totalWithdrawlUsdtCount: z.number(),
    totalWithdrawalUsdt: z.number(),
    totalWithdrawalOneMonthCount: z.number(),
    totalWithdrawalOneMonthAmount: z.number(),
    totalWithdrawlOneMonthUsdtCount: z.number(),
    totalWithdrawalOneMonthUsdt: z.number(),
  }),
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
  receiveableAmount: z.number(),
  status: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  approvedBy: z.null(),
  signature: z.string(),
  reason: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  Player: z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    createdAt: z.string(),
    lastLoginDate: z.string(),
    playerCode: z.null(),
    PlayerStatus: z.string(),
    loginAttempt: z.number(),
    PlayerWallet: z.array(
      z.object({
        balance: z.number(),
        bonus: z.number(),
        requiredBetAmount: z.number(),
      })
    ),
    AllPlayerPaymentAccounts: z.array(playerPaymentSchema),
    PlayerPaymentAccount: z.array(playerPaymentSchema),
    PlayerLoginActivity: z.array(
      z.object({
        id: z.string(),
        ipAddress: z.string(),
        location: z.string(),
        device: z.string(),
        loginTime: z.string(),
        logoutTime: z.null(),
      })
    ),
    accountOpenDate: z.number(),
  }),
  PaymentAccount: paymentManagementSchema,
  type: z.string(),
  totalRate: z.string(),
});

export type TransactionsWithdrawDetailData = z.infer<
  typeof transactionWithdrawDetailSchema
>;
