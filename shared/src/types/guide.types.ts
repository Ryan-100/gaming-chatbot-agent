import { z } from 'zod';
import { langSchema } from './lang.types';

export const guideSchema = z.object({
  id: z.string(),
  langId: z.string(),
  guideType: z.string(),
  showImages: z.boolean(),
  showVideos: z.boolean(),
  images: z.array(
    z.object({ id: z.string(), url: z.string(), order: z.number() })
  ),
  videos: z.array(
    z.object({ id: z.string(), url: z.string(), order: z.number() })
  ),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Lang: langSchema,
});

export type GuideListData = z.infer<typeof guideSchema>;

export const updateGuideSchema = guideSchema.omit({
  status: true,
  createdAt: true,
  updatedAt: true,
  Lang: true,
});

export type UpdateGuideFrom = z.infer<typeof updateGuideSchema>;
