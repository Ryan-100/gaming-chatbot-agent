import { z } from 'zod';
import { paymentManagementSchema } from './payment-management.types';
import { playerPaymentSchema } from './player-payment.types';
// import { paymentCategorySchema } from './payment-category.types';

export const imageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdById: z.string(),
  updatedById: z.string(),
  createdByPlayerId: z.string(),
  updatedByPlayerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PaymentCategorySchema = z.object({
  id: z.string(),
  imageId: z.string(),
  accountType: z.string(),
  showQR: z.boolean(),
  order: z.number(),
  transactionDigitCount: z.number(),
  paymentTypeId: z.string(),
  isPublish: z.boolean(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string(),
  updatedById: z.null(),
  File: imageSchema,
  PaymentType: z.object({ isCrypto: z.boolean() }),
});

export const transactionsDepositSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
  transferedAmount: z.number(),
  status: z.string(),
  transactionId: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  approvedBy: z.string().optional(),
  reason: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  ApprovedAdmin: z.object({ name: z.string(), agentCode: z.null() }),
  Player: z.object({ id: z.string(), name: z.string(), playerCode: z.null() }),

  PaymentAccount: paymentManagementSchema.pick({
    accountName: true,
    accountNumber: true,
    id: true,
    memo: true,
  }),
  Image: imageSchema,
  PaymentCategory: PaymentCategorySchema.extend({
    File: imageSchema,
  }),
});

export type TransactionsDepositListData = z.infer<
  typeof transactionsDepositSchema
>;

export const transactionsDepositDetailSchema = transactionsDepositSchema.extend(
  {
    PaymentCategory: PaymentCategorySchema,
    type: z.string(),
    totalRate: z.string(),
    Player: z.object({
      id: z.string(),
      name: z.string(),
      phone: z.null(),
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
  }
);
export type TransactionsDepositDetailData = z.infer<
  typeof transactionsDepositDetailSchema
>;
