import { z } from 'zod';

export const trackPanelSchema = z.object({
  id: z.number(),
  operator_name: z.string(),
  url: z.string(),
  user_name: z.string(),
  password: z.string(),
  main_game_id: z.union([z.string(), z.number()]),
  merchant_code: z.string(),
  vpn_required: z.union([z.boolean(), z.string()]),
  created_at: z.string(),
  updated_at: z.string(),
  mainGames: z.object({
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
  }),
});
export type TrackPanelListData = z.infer<typeof trackPanelSchema>;

export const createTrackPanelSchema = trackPanelSchema.pick({
  operator_name: true,
  url: true,
  user_name: true,
  password: true,
  main_game_id: true,
  merchant_code: true,
  vpn_required: true,
});
export type CreateTrackPanelForm = z.infer<typeof createTrackPanelSchema>;

export const updateTrackPanelSchema = createTrackPanelSchema.extend({
  id: z.number(),
});
export type UpdateTrackPanelForm = z.infer<typeof updateTrackPanelSchema>;
