import { z } from 'zod';

export const transactionGameSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  main_game: z.string(),
  child_game: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  game_status: z.string(),
  deposit_value: z.number(),
  withdraw_value: z.number(),
  win_value: z.number(),
  lose_value: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  users: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    player_code: z.string(),
  }),
  mainGames: z.object({ game_name: z.string() }),
  childGames: z.object({ game_name_en: z.string() }),
});
export type TransactionGameListData = z.infer<typeof transactionGameSchema>;
