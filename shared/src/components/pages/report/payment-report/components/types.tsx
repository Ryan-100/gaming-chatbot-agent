import { z } from 'zod';

export const depositReceivingAccSchema = z.object({
  pay: z.string(),
  level: z.string(),
  phone: z.string(),
  paymentMethod: z.string(),
  count: z.number(),
  amount: z.number(),
});

export type DepositReceivingAcc = z.infer<typeof depositReceivingAccSchema>;
