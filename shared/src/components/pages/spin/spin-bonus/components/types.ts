import { z } from 'zod';

export const spinBonusSchema = z.object({
  id: z.number(),
  count: z.number(),
  value: z.string(),
});

export type SpinBonus = z.infer<typeof spinBonusSchema>;
