import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  agentId: z.string(),
  phone: z.string(),
  email: z.string(),
  joined: z.string(),
  profilePicture: z.string().url(),
});

export const loginActivitySchema = z.object({
  id: z.string(),
  device: z.string(),
  location: z.string(),
  dateTime: z.string(),
  status: z.string(),
});

export const profileSchema = z.object({
  user: userSchema,
  loginActivity: z.array(loginActivitySchema),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
export type LoginActivitySchema = z.infer<typeof loginActivitySchema>;

