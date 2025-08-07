import { z } from 'zod';

const thirdPartyBalanceSchema = z.object({
  errCode: z.string(),
  data: z.number(),
  errMsg: z.string(),
});

export type ThirdPartyBalanceData = z.infer<typeof thirdPartyBalanceSchema>;
