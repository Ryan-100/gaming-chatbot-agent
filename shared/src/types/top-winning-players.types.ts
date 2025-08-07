import { z } from 'zod';
import { childGameSchema } from './child-games.types';

export const topWinningPlayerSchema = z.object({
  id: z.number(),
  win_value: z.string(),
  created_at: z.string(),
  users: z.object({
    id: z.string(),
    user_id: z.string(),
    player_code: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.null(),
    profile_imgae_url: z.null(),
    created_at: z.string(),
  }),
  mainGames: z.object({
    id: z.number(),
    game_name: z.string(),
    p_code: z.string(),
  }),
  childGames: childGameSchema,
});
export type TopWinningPlayerListData = z.infer<typeof topWinningPlayerSchema>;
