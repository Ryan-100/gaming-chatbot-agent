import { z } from 'zod';

export const mainGameSchema = z.object({
  id: z.number(),
  game_name: z.string(),
  is_active: z.boolean(),
  supported_code: z.string(),
  sorting: z.number(),
  p_code: z.string(),
  has_child: z.boolean(),
  is_exchange: z.boolean(),
  maintain_status: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  mainGameLanguages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      language_id: z.string(),
      icon: z.string(),
    })
  ),
});

export type MainGameListData = z.infer<typeof mainGameSchema>;

export const mainGameDetailSchema = mainGameSchema.extend({
  gameType: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      code: z.string(),
    })
  ),
  maintain_start_date: z.string(),
  maintain_end_date: z.string(),
});

export type MainGameDetailData = z.infer<typeof mainGameDetailSchema>;

export const updateMaintenanceSchema = z.object({
  id: z.number(),
  p_code: z.string(),
  status: z.boolean(),
});

export type UpdateMaintenanceForm = z.infer<typeof updateMaintenanceSchema>;

export const updateMainGameSchema = z.object({
  id: z.number(),
  sorting: z.number(),
  has_child: z.boolean(),
  is_active: z.boolean(),
  mainGameLanguages: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      language_id: z.string(),
      icon: z.string(),
    })
  ),
});

export type UpdateMainGameForm = z.infer<typeof updateMainGameSchema>;
