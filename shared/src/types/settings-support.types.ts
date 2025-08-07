import { z } from 'zod';
import { langSchema } from './lang.types';

export const settingSupportSchema = z.object({
  id: z.string(),
  buttonName: z.string(),
  message: z.string(),
  langId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Lang: langSchema,
});

export type SettingSupportListData = z.infer<typeof settingSupportSchema>;

export const updateSettingSupportSchema = settingSupportSchema.pick({
  id: true,
  buttonName: true,
  message: true,
  langId: true,
});

export type UpdateSettingSupportForm = z.infer<
  typeof updateSettingSupportSchema
>;
