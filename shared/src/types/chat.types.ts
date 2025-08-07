import { z } from 'zod';
import { playerSchema } from './players.types';

export const chatRoomListSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  adminId: z.string(),
  ChatRoomStatus: z.string(),
  blockReason: z.null(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Admin: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phone: z.null(),
    password: z.string(),
    agentCode: z.string(),
    roleId: z.string(),
    imageId: z.null(),
    AdminStatus: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    Image: z.null(),
  }),
  Player: playerSchema,
  Message: z.array(
    z.object({
      id: z.string(),
      sender: z.string(),
      content: z.string(),
      caption: z.null(),
      createdAt: z.string(),
      Attachment: z.array(z.unknown()),
    })
  ),
});

export type ChatRoomListData = z.infer<typeof chatRoomListSchema>;

export const playerMediaSchema = z.object({
  media: z.array(
    z.object({ name: z.string(), url: z.string(), date: z.date() })
  ),
  file: z.array(
    z.object({ name: z.string(), url: z.string(), date: z.date() })
  ),
});

export type PlayerMediaData = z.infer<typeof playerMediaSchema>;
