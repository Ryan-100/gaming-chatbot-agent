import { z } from 'zod';

export const langSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  shortName: z.string(),
  flag: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
