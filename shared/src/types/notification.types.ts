import { z } from 'zod';

export const notiContentSchema = z.object({
  label: z.string(),
  description: z.string(),
  buttonText: z.string().optional(),
  Language: z.object({
    name: z.string(),
    value: z.string(),
    shortName: z.string(),
    flag: z.string(),
  }),
  File: z.object({ id: z.string(), url: z.string() }),
});

export const notificationSchema = z.object({
  id: z.string(),
  notificationType: z.string(),
  playerLevelIds: z.array(
    z.object({ id: z.string(), name: z.string(), isChecked: z.boolean() })
  ),
  externalLink: z.string().optional(),
  appFunctionId: z.string().optional(),
  isPinned: z.boolean(),
  activePocketMoneyId: z.string().optional(),
  createdById: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  AppFunction: z.string().optional(),
  ActivePocketMoney: z.string().optional(),
  NotiContent: notiContentSchema,
  CreatedBy: z.object({ id: z.string(), name: z.string() }),
});
export type NotificationListData = z.infer<typeof notificationSchema>;

export const notificationDetailSchema = notificationSchema.extend({
  NotiContent: z.array(notiContentSchema),
});

export type NotificationDetailData = z.infer<typeof notificationDetailSchema>;

export const notificationAppFunctionSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type NotificationAppFunctionListData = z.infer<
  typeof notificationAppFunctionSchema
>;

export const createNotificationSchema = z.object({
  notificationType: z.string().optional(),
  fileId: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  playerLevelIds: z
    .array(
      z.object({
        name: z.string().optional(),
        id: z.string().optional(),
        isChecked: z.boolean().optional(),
      })
    )
    .optional(),
  externalLink: z.string().optional(),
  buttonText: z.string().optional(),
  languageId: z.string().optional(),
  appFunctionId: z.string().optional(),
  isPinned: z.boolean().optional(),
  activePocketMoneyId: z.string().optional(),
});

export type CreateNotificationForm = z.infer<typeof createNotificationSchema>;
