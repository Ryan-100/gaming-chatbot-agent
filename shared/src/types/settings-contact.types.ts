import { z } from 'zod';

export const settingContactSchema = z.object({
  id: z.string(),
  supportType: z.string(),
  address: z.string(),
  isPublish: z.union([z.string(), z.boolean()]),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SettingContactListData = z.infer<typeof settingContactSchema>;

export const createSettingContactSchema = z
  .object({
    supportType: z.string(), // Assuming PHONE and EMAIL are the only types
    address: z.string(),
    isPublish: z.union([z.string(), z.boolean()]),
  })
  .superRefine((data, ctx) => {
    if (data.supportType === 'PHONE') {
      // Check if the address is a valid phone number (for simplicity, checking length here)
      const phoneRegex = /^\d{9,15}$/; // Adjust as needed
      if (!phoneRegex.test(data.address)) {
        ctx.addIssue({
          code: 'custom', // Required field
          path: ['address'],
          message:
            'Address must be a valid phone number when support type is PHONE',
        });
      }
    } else if (data.supportType === 'EMAIL') {
      try {
        z.string().email().parse(data.address); // Validate email
      } catch (e) {
        ctx.addIssue({
          code: 'custom', // Required field
          path: ['address'],
          message: 'Address must be a valid email when support type is EMAIL',
        });
      }
    }
  });

export type CreateSettingContactForm = z.infer<
  typeof createSettingContactSchema
>;

export const updateSettingContactSchema = createSettingContactSchema;

export type UpdateSettingContactForm = z.infer<
  typeof updateSettingContactSchema
>;
