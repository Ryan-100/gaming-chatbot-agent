import { applicationSchema } from './../../../../types/applications.types';
import { z } from 'zod';

export const applicationListSchema = applicationSchema
  .pick({
    id: true,
    title: true,
    category: true,
    createdAt: true,
    download: true,
    rating: true,
    status: true,
  })
  .extend({});

export type AppsData = z.infer<typeof applicationListSchema>;
