import { z } from 'zod';
import { depositDashboardRequestSchema } from './deposit-dashboard.types';

export const depositRecordHistorySchema = depositDashboardRequestSchema
export type DepositRecordHistoryListData = z.infer<typeof depositRecordHistorySchema>;

export const depositAutoTopUpSchema = z.object({
  recordHistory: z.array(depositRecordHistorySchema),
  totalAmount: z.number(),
});

export type DepositAutoTopUpListData = z.infer<typeof depositAutoTopUpSchema>;
