import { z } from 'zod';
import {
  PmTargetEnum,
  PmTypeEnum,
  TimeUnitEnum,
} from './backend-defined-enum.types';
import { playerSchema } from './player.types';
import { playerLevelSchema } from './player-level.types';

export const playerForPmSchema = playerSchema
  .pick({
    id: true,
    email: true,
    name: true,
  })
  .extend({
    PlayerLevel: playerLevelSchema,
  });

export type playerListForPMData = z.infer<typeof playerForPmSchema>;

const levelSchema = z.object({
  name: z.string(),
});

export const pocketMoneyDetailsSchema = z.object({
  id: z.string(),
  title: z.string(),
  totalAmount: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  playerType: PmTargetEnum,
  type: PmTypeEnum,
  expireTime: z.number(),
  expireType: TimeUnitEnum,
  turnOverRate: z.number(),
  countClaimed: z.number(),
  countRemained: z.number(),
  totalCount: z.number(),
  totalClaimed: z.number(),
  totalRemained: z.number(),
  levelIds: z.array(levelSchema),
  playerIds: z.array(
    z.object({
      name: z.string(),
      PlayerLevel: z.object({
        name: z.string(),
      }),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const pocketMoneyUpdateDetailsSchema = z.object({
  id: z.string(),
  title: z.string(),
  playerType: PmTargetEnum,
  totalAmount: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  type: PmTypeEnum,
  expireTime: z.number(),
  expireType: TimeUnitEnum,
  turnOverRate: z.number(),
  countClaimed: z.number(),
  totalCount: z.number(),
  totalClaimed: z.number(),
  totalRemained: z.number(),
  levelIds: z.array(z.string()),
  playerIds: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  levelDetails: z.array(
    z.object({
      id: z.string(),
      pocketMoneyId: z.string(),
      levelId: z.string(),
      min: z.number(),
      max: z.number(),
      amount: z.number(),
      count: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
});

export type PocketMoneyUpdateDetailsData = z.infer<
  typeof pocketMoneyUpdateDetailsSchema
>;

export const pocketMoneyListSchema = pocketMoneyDetailsSchema
  .pick({
    id: true,
    title: true,
    totalAmount: true,
    startDate: true,
    endDate: true,
  })
  .extend({
    type: z.string(),
    levelIds: z.array(z.string()),
    playerIds: z.array(z.string()),
    playerDetail: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        playerCode: z.string(),
      })
    ),
  });

export type PocketMoneyListData = z.infer<typeof pocketMoneyListSchema>;

export type PocketMoneyDetailsData = z.infer<typeof pocketMoneyDetailsSchema>;

export const pocketMoneyTransactionSchema = z.object({
  id: z.string(),
  playerId: z.string(),
  expireDate: z.string(),
  amount: z.string(),
  bonusAmount: z.number(),
  pocketMoneyId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  Player: z.object({
    name: z.string(),
    PlayerLevel: z.object({
      name: z.string(),
    }),
  }),
});

export type PocketMoneyTransactionListData = z.infer<
  typeof pocketMoneyTransactionSchema
>;

export const createPocketMoneySchema = z
  .object({
    title: z.string(),
    playerType: PmTargetEnum,
    type: PmTypeEnum,
    startDate: z.string(),
    endDate: z.string(),
    expireTime: z.number(),
    expireType: TimeUnitEnum,
    totalAmount: z.number(),
    turnOverRate: z.number(),
    totalCount: z.number().optional(), //there is no count on target="player"
    levelDetails: z
      .array(
        z.object({
          levelId: z.string().optional(),
          min: z.number().min(1).optional(),
          max: z.number().min(1).optional(),
          amount: z.number().optional(),
          count: z.number().optional(),
        })
      )
      .optional(), //there is no leveldetails on random and player
    playerIds: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    // Only validate min and max when type is 'FAIR'
    if (data.type === 'FAIR' && data.levelDetails) {
      data.levelDetails.forEach((levelDetail, index) => {
        const { min = 0, max = 0, amount = 0, count = 0 } = levelDetail;
        const minResult = (amount * 0.6) / (count || 1);
        const maxResult = amount + amount * 0.2;
        const maxTotal = max * count;

        if (min < minResult) {
          ctx.addIssue({
            path: ['levelDetails', index, 'min'],
            code: z.ZodIssueCode.custom,
            message: `Min Value should be greater than ${minResult.toFixed(2)}`,
          });
        }
        if (maxTotal < maxResult) {
          const calculatedMax = maxResult / (count || 1);
          ctx.addIssue({
            path: ['levelDetails', index, 'max'],
            code: z.ZodIssueCode.custom,
            message: `Max Value should be greater than ${calculatedMax.toFixed(
              2
            )}`,
          });
        }
      });
    }

    // Ensure levelDetails is required when type is 'WEIGHT'
    if (
      data.type === 'WEIGHT' &&
      (!data.levelDetails || data.levelDetails.length === 0)
    ) {
      ctx.addIssue({
        path: ['levelDetails'],
        code: z.ZodIssueCode.custom,
        message: "levelDetails is required when type is 'WEIGHT'",
      });
    }
  });

export type CreatePocketMoneyForm = z.infer<typeof createPocketMoneySchema>;
