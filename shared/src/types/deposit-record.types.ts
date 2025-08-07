import { z } from 'zod';
import { fileSchema } from './file-upload.types';
import { playerSchema } from './player.types';

export const depositRecordHistorySchema = z.object({
  createdAtDate: z.string(),
  createdAtMonth: z.string(),
  total_amount: z.number(),
  total_transfered_amount: z.number(),
  pending_count: z.number(),
  confirmed_count: z.number(),
  total_request: z.number(),
});

export type DepositRecordHistoryListData = z.infer<
  typeof depositRecordHistorySchema
>;

export const depositRecordHistoryDetailSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  status: z.string(),
  amount: z.number(),
  transactionId: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  imageId: z.string(),
  approvedBy: z.string(),
  reason: z.null(),
  exchangeRateId: z.null(),
  transferedAmount: z.number(),
  depositBonusId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
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
  Image: fileSchema,
  ExchangeRate: z.object({
    id: z.string(),
    amountPerUsdt: z.number(),
    currency: z.string(),
    action: z.string(),
    updatedAt: z.string(),
    updatedById: z.string(),
  }),
  Player: playerSchema,
});

export type DepositRecordHistoryDetailListData = z.infer<
  typeof depositRecordHistoryDetailSchema
>;
