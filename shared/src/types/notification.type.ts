import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.number(),
  label: z.string(),
  type: z.string(),
  cover: z.string().optional(),
  redirect_to: z
    .object({
      type: z.string(),
      to: z.string(),
    })
    .optional(),
  button_text: z
    .object({
      button_eng: z.string(),
      button_mm: z.string(),
      button_cha: z.string(),
    })
    .optional(),
  member_level: z.array(
    z.object({
      level: z.string(),
      is_checked: z.boolean(),
    })
  ),
  created_at: z.string(),
  created_by: z.string(),
  is_pin: z.boolean(),
  description: z.string(),
});

export type NotificationSchema = z.infer<typeof notificationSchema>;

export const notificationListSchema = z.array(notificationSchema);
export type NotificationListSchema = z.infer<typeof notificationListSchema>;
