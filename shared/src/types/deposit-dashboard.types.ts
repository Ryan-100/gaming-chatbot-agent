import { z } from 'zod';
import { fileSchema } from './file-upload.types';
import { paymentTypeSchema } from './payment-type.types';
import { playerSchema } from './player.types';

export const depositDashboardDetailTableSchema = z.object({
  totalAmount: z.number(),
  transferedAmount: z.number(),
  totalRequest: z.number(),
  paymentProvider: z.object({
    id: z.string(),
    imageId: z.string(),
    accountType: z.string(),
    showQR: z.boolean(),
    order: z.number(),
    transactionDigitCount: z.number(),
    paymentTypeId: z.string(),
    PaymentType: paymentTypeSchema,
    isPublish: z.boolean(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    createdById: z.string(),
    updatedById: z.string(),
    File: fileSchema,
  }),
});

export type DepositDashboardDetailTableData = z.infer<
  typeof depositDashboardDetailTableSchema
>;

export const depositDashboardRequestSchema = z.object({
  id: z.string(),
  requestedBy: z.null(),
  status: z.string(),
  amount: z.number(),
  transferedAmount: z.number(),
  transactionId: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.null(),
  imageId: z.null(),
  approvedBy: z.string(),
  reason: z.null(),
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

export type DepositDashboardRequestListData = z.infer<
  typeof depositDashboardRequestSchema
>;

export const createDepositDashboardDigitSchema = z.object({
  amount: z.union([z.string().max(8), z.number()]),
  digit: z.string(),
});

export type CreateDepositDashboardDigitForm = z.infer<
  typeof createDepositDashboardDigitSchema
>;
