import { z } from 'zod';

export const gameActivityByPlayerSchema = z.object({
  game: z.string(),
  main_game: z.string(),
  game_deposit: z.number(),
  game_withdraw: z.number(),
  win_value: z.number(),
  lose_value: z.number(),
  exited_on: z.string(),
  started_on: z.string(),
  duration: z.string(),
});

export type GameActivityByPlayerListData = z.infer<
  typeof gameActivityByPlayerSchema
>;
