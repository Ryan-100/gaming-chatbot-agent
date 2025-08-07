import { z } from 'zod';
import { fileSchema } from './file-upload.types';

export const applicationStatusEnum = z.enum(['Active', 'Away']);
export const playerReceivingAccountSchema = z.object({
  account: z.string(),
  phone: z.string(),
  method: z.string(),
});
export type PlayerReceivingAccount = z.infer<
  typeof playerReceivingAccountSchema
>;

export const playerDeviceInfoSchema = z.object({
  deviceId: z.string(),
  ipAddress: z.string(),
});
export type PlayerDeviceInfo = z.infer<typeof playerDeviceInfoSchema>;

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  status: applicationStatusEnum.catch('Active'),
  lastActive: z.string(),
  registeredDate: z.string(),
  game: z.string(),
  mainGame: z.string(),
  actions: z.string(),
  totalBalance: z.number(),
  mainDeposit: z.number(),
  bonus: z.number(),
  deposit: z.number(),
  withdraw: z.number(),
  win: z.number(),
  password: z.string(),
  passwordLocked: z.string(),
  loginAttempts: z.number(),
  invitedBy: z.string(),
  regWithPromocode: z.string(),
  invitedUsers: z.number(),
  promocode: z.string(),
  receivingAccounts: z.array(playerReceivingAccountSchema),
  deviceInfo: z.array(playerDeviceInfoSchema),
  Image: fileSchema,
});

export type Player = z.infer<typeof playerSchema>;

//transaction
export const playerTransactionSchema = z.object({
  id: z.number(),
  amount: z.number(),
  account: z.string(),
  type: z.enum(['Withdraw', 'Deposit']),
  status: z.enum(['Pending', 'Accepted', 'Rejected']),
  txnId: z.string(),
  payment: z.string(),
  dateTime: z.string(),
});

export type PlayerTransaction = z.infer<typeof playerTransactionSchema>;

//bonusHistory
export const playerBonusHistorySchema = z.object({
  id: z.number(),
  amount: z.number(),
  type: z.string(),
  status: z.enum(['-', 'Valid', 'Expired']),
  validUntil: z.string(),
  dateTime: z.string(),
});

export type PlayerBonusHistory = z.infer<typeof playerBonusHistorySchema>;

//game activity
export const playerGameActivitySchema = z.object({
  id: z.number(),
  game: z.string(),
  mainGame: z.string(),
  duration: z.string(),
  exitedOn: z.string(),
  startedOn: z.string(),
});

export type PlayerGameActivity = z.infer<typeof playerGameActivitySchema>;
