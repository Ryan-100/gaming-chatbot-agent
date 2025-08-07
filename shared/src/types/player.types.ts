import { z } from 'zod';

const playerReceivingAccountSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  memo: z.string(),
  cryptoNetworkId: z.string().optional(),
  accountCanUpdate: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accountName: z.string(),
  accountnumber: z.string(),
  paymentCategoryId: z.string(),
  PaymentCategory: z.object({
    accountType: z.string(),
  }),
  CryptoNetwork: z
    .object({
      name: z.string(),
      requireMemo: z.boolean(),
    })
    .nullable(),
});

export type PlayerReceivingAccountData = z.infer<
  typeof playerReceivingAccountSchema
>;

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.null(),
  email: z.string(),
  playerCode: z.string(),
  PlayerStatus: z.string(),
  lastLoginDate: z.string(),
  createdAt: z.string(),
  PlayerBlock: z.array(
    z.object({ PlayerBlockStatus: z.string(), reason: z.string() })
  ),
  activeStatus: z.string(),
});

export type PlayerListData = z.infer<typeof playerSchema>;

export const playerDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  grade: z.number(),
  playerCode: z.string(),
  referralCode: z.string(),
  imageId: z.string(),
  loginAttempt: z.number(),
  lastLoginDate: z.string(),
  PlayerStatus: z.string(),
  playerLevelId: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  accessToken: z.null(),
  refreshToken: z.null(),
  Image: z.object({ url: z.string() }),
  PlayerLevel: z.object({
    name: z.string(),
    rank: z.string(),
    Image: z.object({ url: z.string() }),
  }),
  PlayerWallet: z.array(z.unknown()),
  PlayerLoginActivity: z.array(
    z.object({
      device: z.string(),
      ipAddress: z.string(),
      location: z.string(),
    })
  ),
  PlayerBlock: z.array(
    z.object({
      reason: z.string(),
      createdAt: z.string(),
      CreatedByAdmin: z.object({ name: z.string() }),
    })
  ),
  PlayerPaymentAccount: z.array(playerReceivingAccountSchema),
  depositAmount: z.number(),
  requiredBetAmount: z.number(),
  withdrawAmount: z.number(),
  winningAmount: z.number(),
  topupWithdraw: z.object({
    data: z.object({
      totalTopupCount: z.number(),
      totalTopupAmount: z.number(),
      totalTopupUsdtCount: z.number(),
      totalTopupUsdt: z.number(),
      totalTopupOneMonthCount: z.number(),
      totalTopupOneMonthAmount: z.number(),
      totalTopupOneMonthUsdtCount: z.number(),
      totalTopupOneMonthUsdt: z.number(),
      totalWithdrawalCount: z.number(),
      totalWithdrawalAmount: z.number(),
      totalWithdrawlUsdtCount: z.number(),
      totalWithdrawalUsdt: z.number(),
      totalWithdrawalOneMonthCount: z.number(),
      totalWithdrawalOneMonthAmount: z.number(),
      totalWithdrawlOneMonthUsdtCount: z.number(),
      totalWithdrawalOneMonthUsdt: z.number(),
    }),
  }),
  totalBalance: z.number(),
  bonus: z.number(),
  passwordLocked: z.enum(['Yes', 'No']),
});

export type PlayerDetailData = z.infer<typeof playerDetailSchema>;
