import { z } from 'zod';

export const userListSchema = z.object({
  date: z.string(),
  userCount: z.number(),
});
export type UserListData = z.infer<typeof userListSchema>;

export const reportUserSchema = z.object({
  totalUserCount: z.number(),
  newUserCount: z.number(),
  UserList: z.array(
    z.object({ createdAtDate: z.string(), userCount: z.number() })
  ),
});
export type ReportUserData = z.infer<typeof reportUserSchema>;
