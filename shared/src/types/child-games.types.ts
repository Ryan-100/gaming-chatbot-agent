import { z } from 'zod';
import { mainGameSchema } from './main-games.types';

export const childGameByMainSchema = z.object({
  id: z.number().optional(),
  main_game_id: z.number(),
  game_name_en: z.string({ message: 'Required' }).min(1),
  game_name_mm: z.string({ message: 'Required' }).min(1),
  game_name_zh: z.string({ message: 'Required' }).min(1),
  icon_en: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
  icon_mm: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
  icon_zh: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
  is_active: z.boolean({ message: 'Required' }),
  sorting: z.number(),
  g_code: z.string(),
  g_type: z.string(),
  p_code: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ChildGameListDataByMain = z.infer<typeof childGameByMainSchema>;

export const childGameSchema = childGameByMainSchema.extend({
  mainGames: mainGameSchema,
});

export type ChildGameListData = z.infer<typeof childGameSchema>;

export const childGameDetailSchema = childGameSchema.extend({
  gameType: z.object({
    name: z.string(),
    code: z.string(),
  }),
});

export type ChildGameDetailData = z.infer<typeof childGameDetailSchema>;

export const updateChildGameSchema = childGameSchema
  .omit({
    main_game_id: true,
    p_code: true,
    g_code: true,
    g_type: true,
    created_at: true,
    updated_at: true,
    mainGames: true,
  })
  .extend({
    is_active: z.union([z.string(), z.boolean({ message: 'Required' })]),
  });

export type UpdateChildGameForm = z.infer<typeof updateChildGameSchema>;
