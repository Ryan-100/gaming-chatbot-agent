import { z } from 'zod';
import { withdrawAccountHolderSchema } from './withdraw-admin.types';

export const withdrawDashboardSchema = z.object({
  pendingCount: z.number(),
  pendingAmount: z.number(),
  pendingUsdt: z.number(),
  acceptedCount: z.number(),
  acceptedAmount: z.number(),
  acceptedUsdt: z.number(),
  rejectedCount: z.number(),
  rejectedAmount: z.number(),
  rejectedUsdt: z.number(),
  withdrawDashboard: z.object({
    WithdrawAccountHolder: z.array(withdrawAccountHolderSchema),
  }),
});

export type WithdrawDashboardData = z.infer<typeof withdrawDashboardSchema>;
