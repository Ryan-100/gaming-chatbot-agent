import { z } from 'zod';
import { languageSchema } from './language.types';

export const botManagementSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  message: z.string(),
  fileId: z.string(),
  langId: z.string(),
  botManagementType: z.string(),
  link: z.string().optional(),
  downloadType: z.string().optional(),
  showDownloadType: z.boolean().optional(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Lang: languageSchema,
  File: z.object({
    url: z.string(),
  }),
});

export const botManagementListSchema = z.array(botManagementSchema);
export type BotManagementList = z.infer<typeof botManagementListSchema>;

export const createBotManagementSchema = botManagementSchema.pick({
  name: true,
  message: true,
  fileId: true,
  langId: true,
  botManagementType: true,
  link: true,
  downloadType: true,
  showDownloadType: true,
});

export type CreateBotManagementForm = z.infer<typeof createBotManagementSchema>;
