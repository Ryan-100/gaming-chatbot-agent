import { z } from 'zod';
import { TimeUnitEnum } from './backend-defined-enum.types';

export const depositBonusSchema = z.object({
  id: z.string(),
  bonusTitle: z.string(),
  bonusPercentage: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  levelIds: z.array(z.string()),
  expireTime: z.number(),
  maxAmount: z.number(),
  expireType: TimeUnitEnum,
  turnOverRate: z.number(),
  bonusStatus: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DepositBonusListData = z.infer<typeof depositBonusSchema>;

export const firstTimeDepositBonusSchema = z.object({
  id: z.string(),
  bonusTitle: z.string(),
  bonusPercentage: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  levelIds: z.array(z.string()),
  expireTime: z.number(),
  maxAmount: z.number(),
  expireType: TimeUnitEnum,
  turnOverRate: z.number(),
  bonusStatus: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FirstTimeDepositBonusListData = z.infer<
  typeof firstTimeDepositBonusSchema
>;

export const registerBonusSchema = z.object({
  id: z.string(),
  bonusTitle: z.string(),
  bonusAmount: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  expireTime: z.number(),
  expireType: TimeUnitEnum,
  turnOverRate: z.number(),
  bonusStatus: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type RegisterBonusListData = z.infer<typeof registerBonusSchema>;

export const activeBonusSchema = z.object({
  activeDeposit: z.array(depositBonusSchema),
  activeRegister: z.array(registerBonusSchema),
  activeFirstDeposit: z.array(depositBonusSchema),
});

export type ActiveBonusData = z.infer<typeof activeBonusSchema>;

export const depositBonusDetailsSchema = z.object({
  id: z.string(),
  depositAmount: z.number(),
  bonusAmount: z.number(),
  playerId: z.string(),
  bonusId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  claimed_at: z.string(),
  Player: z.object({
    name: z.string(),
    playerCode: z.string(),
  }),
});

export type DepositBonusDetailsListData = z.infer<
  typeof depositBonusDetailsSchema
>;

export const firstTimeDepositBonusDetailsSchema = z.object({
  id: z.string(),
  depositAmount: z.number(),
  bonusAmount: z.number(),
  playerId: z.string(),
  bonusId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  claimed_at: z.string(),
  Player: z.object({
    name: z.string(),
    playerCode: z.string(),
  }),
});

export type FirstTimeDepositBonusDetailsListData = z.infer<
  typeof firstTimeDepositBonusDetailsSchema
>;

export const registerBonusDetailsSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  bonusAmount: z.number(),
  bonusId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Player: z.object({
    name: z.string(),
    playerCode: z.string(),
  }),
});

export type RegisterBonusDetailsListData = z.infer<
  typeof registerBonusDetailsSchema
>;

export const createDepositBonusSchema = depositBonusSchema
  .pick({
    bonusTitle: true,
    bonusPercentage: true,
    startDate: true,
    endDate: true,
    expireTime: true,
    expireType: true,
    turnOverRate: true,
    bonusStatus: true,
  })
  .extend({
    bonusTitle: z.string({ message: 'Please enter Title' }),
    levelIds: z.array(z.string()).optional(),
    bonusPercentage: z.number().int({ message: 'Please set Percentage' }),
    startDate: z
      .string({ message: 'Please enter start date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    endDate: z
      .string({ message: 'Please enter end date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    expireTime: z.number().int({ message: 'Please set Expire Time' }),
    expireType: z.string({ message: 'Please set Expire Unit' }),
    turnOverRate: z.number().int({ message: 'Please set Turnover Rate' }),
    maxAmount: z.number().int({ message: 'Please enter max amount' }).min(1),
    bonusStatus: z.union([z.boolean(), z.string()]),
  });

export type CreateDepositBonusForm = z.infer<typeof createDepositBonusSchema>;

export const updateDepositBonusSchema = createDepositBonusSchema;
export type UpdateDepositBonusForm = z.infer<typeof updateDepositBonusSchema>;

export const createFirstTimeDepositBonusSchema = firstTimeDepositBonusSchema
  .pick({
    bonusTitle: true,
    bonusPercentage: true,
    startDate: true,
    endDate: true,
    expireTime: true,
    expireType: true,
    turnOverRate: true,
    bonusStatus: true,
  })
  .extend({
    bonusTitle: z.string({ message: 'Please enter Title' }),
    levelIds: z.array(z.string()).optional(),
    bonusPercentage: z.number().int({ message: 'Please set Percentage' }),
    startDate: z
      .string({ message: 'Please enter start date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    endDate: z
      .string({ message: 'Please enter end date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    expireTime: z.number().int({ message: 'Please set Expire Time' }),
    expireType: z.string({ message: 'Please set Expire Unit' }),
    turnOverRate: z.number().int({ message: 'Please set Turnover Rate' }),
    maxAmount: z.number().int({ message: 'Please enter max amount' }).min(1),
    bonusStatus: z.union([z.boolean(), z.string()]),
  });

export type CreateFirstTimeDepositBonusForm = z.infer<
  typeof createFirstTimeDepositBonusSchema
>;

export const updateFirstTimeDepositBonusSchema =
  createFirstTimeDepositBonusSchema;
export type UpdateFirstTimeDepositBonusForm = z.infer<
  typeof updateFirstTimeDepositBonusSchema
>;

export const createRegisterBonusSchema = registerBonusSchema
  .pick({
    bonusTitle: true,
    bonusAmount: true,
    startDate: true,
    endDate: true,
    expireTime: true,
    expireType: true,
    turnOverRate: true,
    bonusStatus: true,
  })
  .extend({
    bonusTitle: z.string({ message: 'Please enter Title' }),
    bonusAmount: z.number().int({ message: 'Please set Bonus Amount' }).min(1),
    startDate: z
      .string({ message: 'Please enter start date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    endDate: z
      .string({ message: 'Please enter end date' })
      .refine((value) => !isNaN(Date.parse(value)), {
        message: 'Invalid date format',
      }),
    expireTime: z.number().int({ message: 'Please set Expire Time' }),
    expireType: z.string({ message: 'Please set Expire Unit' }),
    turnOverRate: z.number().int({ message: 'Please set Turnover Rate' }),
    bonusStatus: z.union([z.boolean(), z.string()]),
  });

export type CreateRegisterBonusForm = z.infer<typeof createRegisterBonusSchema>;

export const updateRegisterBonusSchema = createRegisterBonusSchema;
export type UpdateRegisterBonusForm = z.infer<typeof updateRegisterBonusSchema>;
