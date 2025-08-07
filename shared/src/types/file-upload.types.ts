import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';

export const fileSchema = z.object({
  id: z.string(),
  url: z.string(),
  status: StatusEnum,
  createdById: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  file: z.union([z.string(), z.instanceof(File)]),
});

export type FileData = z.infer<typeof fileSchema>;

export const createFileSchema = fileSchema
  .pick({
    file: true,
  });

export type CreateFile = z.infer<typeof createFileSchema>;

export const updateFileSchema = createFileSchema;

export type UpdateFile = z.infer<typeof updateFileSchema>;
