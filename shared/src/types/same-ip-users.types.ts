import { z } from 'zod';

export const sameIpUsersByPlayerSchema = z.object({
  id: z.string(),
  device: z.string(),
  ipAddress: z.string(),
  location: z.string(),
  loginTime: z.string(),
  logoutTime: z.null(),
  loginStatus: z.string(),
  playerId: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Player: z.object({ name: z.string(), playerId: z.string() }),
});

export type SameIpUsersByPlayerListData = z.infer<
  typeof sameIpUsersByPlayerSchema
>;
