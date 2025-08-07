import { z } from 'zod';
import { paymentCategorySchema } from './payment-category.types';
import { playerPaymentSchema } from './player-payment.types';

export const withdrawPendingSchema = z.object({
  id: z.string(),
  requestedBy: z.string(),
  amount: z.number(),
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

export type WithdrawPendingListData = z.infer<typeof withdrawPendingSchema>;
