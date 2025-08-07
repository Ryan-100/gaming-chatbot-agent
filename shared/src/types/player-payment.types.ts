import { z } from 'zod';
import { paymentCategorySchema } from './payment-category.types';

export const playerPaymentSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  accountName: z.string(),
  accountnumber: z.string(),
  memo: z.string(),
  paymentCategoryId: z.string(),
  cryptoNetworkId: z.string().optional(),
  accountCanUpdate: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  CryptoNetwork: z
    .object({
      name: z.string(),
      requireMemo: z.boolean(),
    })
    .nullable(),
});
