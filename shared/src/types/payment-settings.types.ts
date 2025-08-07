import { z } from 'zod';

export const paymentSettingSchema = z.object({
  id: z.string(),
  paymentChangeTime: z.number(),
  paymentChangeType: z.string(),
  createdById: z.string(),
  updatedById: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type PaymentSettingData = z.infer<typeof paymentSettingSchema>;

export const paymentSettingEditSchema = paymentSettingSchema.pick({
  paymentChangeTime: true,
  paymentChangeType: true,
});

export type PaymentSettingEditForm = z.infer<typeof paymentSettingEditSchema>;
