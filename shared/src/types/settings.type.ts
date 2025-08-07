import { z } from 'zod';

//Phone-Email
export const contactSupportSchema = z.object({
  id: z.number(),
  support_type: z.string(),
  number_address: z.string(),
  is_publish: z.boolean(),
});

export type ContactSupportSchema = z.infer<typeof contactSupportSchema>;

export const contactSupportListSchema = z.array(contactSupportSchema);
export type ContactSupportListSchema = z.infer<typeof contactSupportListSchema>;

//Social Platforms
export const socialPlatformsSchema = z.object({
  id: z.number(),
  social_app: z.string(),
  link: z.string(),
  is_publish: z.boolean(),
});

export type SocialPlatformsSchema = z.infer<typeof socialPlatformsSchema>;

export const socialPlatformsListSchema = z.array(socialPlatformsSchema);
export type SocialPlatformsListSchema = z.infer<typeof socialPlatformsListSchema>;

//Levels
export const levelsSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  min_deposit: z.number(),
  max_deposit: z.number(),
  description: z.string(),
});

export type LevelsSchema = z.infer<typeof levelsSchema>;

export const levelsListSchema = z.array(levelsSchema);
export type LevelsListSchema = z.infer<typeof levelsListSchema>;
