import { z } from 'zod';
import { contactSupportSchema, socialPlatformsSchema } from '../../../../../types/settings.type';

// Phone-Email
export const contactSupportListSchema = contactSupportSchema;

export type ContactSupportData = z.infer<typeof contactSupportListSchema>;

// Social Platforms
export const socialPlatformsListSchema = socialPlatformsSchema;

export type SocialPlatformsData = z.infer<typeof socialPlatformsListSchema>;
