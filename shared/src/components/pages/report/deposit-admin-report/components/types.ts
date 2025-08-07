import { z } from 'zod';

export const depositAdminSchema = z.object({
  id: z.number(),
  name: z.string(),
  paymentMethod: z.string(),
  count: z.number(),
  amount: z.number(),
});

export type DepositAdmin = z.infer<typeof depositAdminSchema>;
