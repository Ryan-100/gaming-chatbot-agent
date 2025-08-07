import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';

const langSchema = z.object({
  createdAt: z.string(),
  flag: z.string(),
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  status: StatusEnum,
  updatedAt: z.string(),
  value: z.string(),
});

export const spinRulesSchema = z.object({
  id: z.string(),
  message: z.string(),
  languageId: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Language: langSchema,
});

export type SpinRulesListData = z.infer<typeof spinRulesSchema>;

export const updateSpinRulesSchema = spinRulesSchema
  .pick({
    id: true,
    message: true,
    languageId: true,
  })
  .extend({ id: z.string().optional() });
export type UpdateSpinRulesForm = z.infer<typeof updateSpinRulesSchema>;
