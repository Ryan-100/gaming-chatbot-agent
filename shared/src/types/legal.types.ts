import { z } from 'zod';
import { langSchema } from './lang.types';

export const legalSchema = z.object({
  id: z.string(),
  content: z.string(),
  langId: z.string(),
  legalType: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Lang: langSchema,
});

export type LegalListData = z.infer<typeof legalSchema>;

export const createLegalSchema = z.object({
  legals: z.array(
    legalSchema.pick({
      content: true,
      langId: true,
      legalType: true,
    })
  ),
});
export type CreateLegalForm = z.infer<typeof createLegalSchema>;

export const updateLegalSchema = z.object({
  legals: z.array(
    legalSchema.pick({
      id: true,
      content: true,
      langId: true,
      legalType: true,
    })
  ),
});
export type UpdateLegalForm = z.infer<typeof updateLegalSchema>;
