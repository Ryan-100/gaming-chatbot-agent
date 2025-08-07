import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';

const imageSchema = z.object({
  id: z.string(),
  url: z.string(),
  status: StatusEnum,
  createdById: z.string(),
  updatedById: z.union([z.string(), z.null()]),
  createdByPlayerId: z.union([z.string(), z.null()]),
  updatedByPlayerId: z.union([z.string(), z.null()]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const playerLevelSchema = z.object({
  id: z.string(),
  name: z.string(),
  rank: z.string(),
  status: StatusEnum,
  imageId: z.string(),
  description: z.string(),
  order: z.number(),
  minDeposit: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Image: imageSchema
});

export const playerLevelListSchema = playerLevelSchema;

export type PlayerLevelListData = z.infer<typeof playerLevelListSchema>;

export const createPlayerLevelSchema = playerLevelSchema
  .pick({
    order: true,
    name: true,
    rank: true,
    minDeposit: true,
    description: true,
  });

export type CreatePlayerLevelForm = z.infer<typeof createPlayerLevelSchema>;

export const updatePlayerLevelSchema = createPlayerLevelSchema;

export type UpdatePlayerLevelForm = z.infer<typeof updatePlayerLevelSchema>;
