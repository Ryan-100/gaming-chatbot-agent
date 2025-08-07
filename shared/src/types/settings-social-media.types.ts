import { z } from 'zod';

export const settingSocialMediaSchema = z.object({
  id: z.string(),
  appLogoId: z.string().optional(),
  link: z.string(),
  name: z.string(),
  address: z.null(),
  isPublish: z.union([z.string(), z.boolean()]),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  AppLogo: z.object({
    id: z.string(),
    url: z.string(),
    status: z.string(),
    createdById: z.string(),
    updatedById: z.null(),
    createdByPlayerId: z.null(),
    updatedByPlayerId: z.null(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export type SettingSocialMediaListData = z.infer<
  typeof settingSocialMediaSchema
>;

export const createSettingSocialMediaSchema = settingSocialMediaSchema.pick({
  appLogoId: true,
  link: true,
  name: true,
  isPublish: true,
});

export type CreateSettingSocialMediaForm = z.infer<
  typeof createSettingSocialMediaSchema
>;

export const updateSettingSocialMediaSchema = createSettingSocialMediaSchema;

export type UpdateSettingSocialMediaForm = z.infer<
  typeof updateSettingSocialMediaSchema
>;
