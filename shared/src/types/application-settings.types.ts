import { z } from 'zod';

export const applicationSettingSchema = z.object({
  id: z.string(),
  appLockTime: z.number(),
  unitType: z.string(),
  version: z.string(),
  language: z.string(),
  appUrl: z.string(),
  createdById: z.string(),
  updatedById: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ApplicationSettingData = z.infer<typeof applicationSettingSchema>;

export const applicationSettingEditSchema = applicationSettingSchema.pick({
  appLockTime: true,
  unitType: true,
  language: true,
  version: true,
  appUrl: true,
});

export type ApplicationSettingEditForm = z.infer<typeof applicationSettingEditSchema>;
