import { z } from 'zod';

export const spinMaintainSchema = z.object({
  maintenance: z.boolean(),
});

export type SpinMaintainData = z.infer<typeof  spinMaintainSchema>