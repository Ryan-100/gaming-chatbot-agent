import { z } from 'zod';
import { paymentCategorySchema } from './payment-category.types';
import { paymentManagementSchema } from './payment-management.types';

export const transactionByPlayerSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
  status: z.string(),
  transactionId: z.string(),
  paymentCategoryId: z.string(),
  paymentAccountId: z.string(),
  approvedBy: z.string(),
  signature: z.string(),
  reason: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  PaymentAccount: paymentManagementSchema.pick({
    accountName: true,
    accountNumber: true,
  }),
  type: z.string(),
});

export type TransactionByPlayerListData = z.infer<
  typeof transactionByPlayerSchema
>;
