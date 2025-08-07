import { z } from 'zod';

export const withdrawAdminSchema = z.object({
  id: z.number(),
  name: z.string(),
  paymentMethod: z.string(),
  count: z.number(),
  amount: z.number(),
  payList: z.number(),
});

export type WithdrawAdmin = z.infer<typeof withdrawAdminSchema>;
