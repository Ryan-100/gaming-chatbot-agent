import { z } from 'zod';

export const applicationStatusEnum = z.enum(['active', 'inactive']);
export const applicationSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.object({
    name: z.string(),
  }),
  lecture: z.object({
    name: z.string(),
  }),
  createdAt: z.string(),
  download: z.string(),
  rating: z.number(),
  status: applicationStatusEnum.catch('active'),
  logo: z.instanceof(File).optional().catch(undefined),
  coverPhoto: z.instanceof(File).optional().catch(undefined),
  apkFileAndroid: z.instanceof(File).optional().catch(undefined),
  ipaFileIOS: z.instanceof(File).optional().catch(undefined),
  screenShots: z.instanceof(File).optional().catch(undefined),
  description: z.string(),
  version: z.string(),
  RAM: z.string(),
  storage: z.string(),
});
export type ApplicationSchema = z.infer<typeof applicationSchema>;
