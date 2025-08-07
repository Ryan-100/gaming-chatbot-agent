import { z } from 'zod';
import { childGameSchema } from './child-games.types';
import { mainGameSchema } from './main-games.types';

export const hotGameSchema = z.object({
  id: z.number(),
  main_game_id: z.number(),
  child_game_id: z.number(),
  sorting: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  totalPlayerCount: z.number(),
  totalWinValue: z.number(),
  childGames: z.object({
    id: z.number().optional(),
    main_game_id: z.number(),
    game_name_en: z.string({ message: 'Required' }).min(1),
    game_name_mm: z.string({ message: 'Required' }).min(1),
    game_name_zh: z.string({ message: 'Required' }).min(1),
    icon_en: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
    icon_mm: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
    icon_zh: z.string({ message: 'Required' }).min(1, 'Please upload the file'),
    is_active: z.union([z.boolean({ message: 'Required' }), z.number()]),
    sorting: z.number(),
    g_code: z.string(),
    g_type: z.string(),
    p_code: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  }),
  mainGames: z.object({
    id: z.number(),
    game_name: z.string(),
    is_active: z.union([z.boolean(), z.number()]),
    supported_code: z.string(),
    sorting: z.number(),
    p_code: z.string(),
    has_child: z.number(),
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
  }),
});

export type HotGameListData = z.infer<typeof hotGameSchema>;
