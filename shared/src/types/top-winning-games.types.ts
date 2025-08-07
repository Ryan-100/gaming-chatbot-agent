import { z } from 'zod';

export const topWinningGameSchema = z.object({
  child_game: z.string(),
  totalPlayerCount: z.number(),
  totalWinValue: z.string(),
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

export type TopWinningGameListData = z.infer<typeof topWinningGameSchema>;

export const topWinnerSchema = z.object({
  user_id: z.string(),
  main_game: z.string(),
  totalWinValue: z.number(),
  mainGames: z.object({ game_name: z.string() }),
  childGames: z.object({ game_name_en: z.string(), game_name_mm: z.string() }),
  users: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.null(),
  }),
});

export type TopWinnerListData = z.infer<typeof topWinnerSchema>;
