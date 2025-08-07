import { z } from 'zod';

export const reportDashboardSchema = z.object({
  currency: z.string(),
  newPlayerCount: z.number(),
  totalWithdrawalAmount: z.number(),
  totalDepositAmount: z.number(),
  todayMainGamesCount: z.number(),
});
export type ReportDashboardData = z.infer<typeof reportDashboardSchema>;
