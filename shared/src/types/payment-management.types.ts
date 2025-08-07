import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';
import { paymentCategorySchema } from './payment-category.types';
import { playerLevelSchema } from './player-level.types';

export const paymentManagementSchema = z.object({
  id: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
  playerLevelId: z.string(),
  order: z.number(),
  balance: z.number(),
  accountLimit: z.number(),
  isPublish: z.boolean(),
  ssRequired: z.boolean(),
  showQR: z.boolean(),
  memo: z.string(),
  imageId: z.string().optional(),
  cryptoNetworkId: z.string(),
  paymentCategoryId: z.string(),
  createdById: z.string(),
  updatedById: z.string().optional(),
  status: StatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentCategory: paymentCategorySchema,
  PlayerLevel: playerLevelSchema,
  Image: z.object({
    id: z.string(),
    url: z.string(),
    status: StatusEnum,
    createdById: z.string(),
    updatedById: z.string().nullable(),
    createdByPlayerId: z.string().nullable(),
    updatedByPlayerId: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
  }),
  CryptoNetwork: z.object({
    name: z.string(),
  })
});

export type PaymentManagementListData = z.infer<typeof paymentManagementSchema>;

export const createPaymentManagementSchema = paymentManagementSchema
  .pick({
    order: true,
    paymentCategoryId: true,
    playerLevelId: true,
    accountLimit: true,
    isPublish: true,
    ssRequired: true,
    showQR: true,
    // imageId: true, // this field has to add manually before api call

    accountNumber: true,

    accountName: true,

    cryptoNetworkId: true,

    memo: true,
  })
  .extend({
    order: z.number().int({ message: 'Sorting No. is Required' }),
    paymentCategoryId: z.string({ message: 'Payment Category is Required' }),
    playerLevelId: z.string({ message: 'Choose Player level' }),
    accountLimit: z.number().int({ message: 'Please Set Account Limit' }),
    isPublish: z.union([
      z.string(),
      z.boolean({ message: 'Choose one for publishment' }),
    ]),
    ssRequired: z.union([
      z.string(),
      z.boolean({ message: 'Choose one for Screenshot Requirement' }),
    ]),
    showQR: z.union([
      z.string(),
      z.boolean({ message: 'Choose one for Show QR' }),
    ]),

    accountNumber: z.string({ message: 'Account address is Required' }),

    accountName: z.string({ message: 'Account Name is Required' }).min(1, { message: 'Account Name must be at least 1 characters long' }),

    cryptoNetworkId: z.string({ message: 'Please select network is Required' }).optional(),

    memo: z.string({ message: 'Memo is Required' }).optional(),
  });

export type CreatePaymentManagementForm = z.infer<
  typeof createPaymentManagementSchema
>;

export const updatePaymentManagementSchema = paymentManagementSchema
.pick({
  order: true,
  playerLevelId: true,
  accountLimit: true,
  isPublish: true,
  ssRequired: true,
  showQR: true,
  // imageId: true, // this field has to add manually before api call

  accountNumber: true,

  accountName: true,

  cryptoNetworkId: true,

  memo: true,
})
.extend({
  order: z.number().int({ message: 'Sorting No. is Required' }),
  playerLevelId: z.string({ message: 'Choose Player level' }),
  accountLimit: z.number().int({ message: 'Please Set Account Limit' }),
  isPublish: z.union([
    z.string(),
    z.boolean({ message: 'Choose one for publishment' }),
  ]),
  ssRequired: z.union([
    z.string(),
    z.boolean({ message: 'Choose one for Screenshot Requirement' }),
  ]),
  showQR: z.union([
    z.string(),
    z.boolean({ message: 'Choose one for Show QR' }),
  ]),

  accountNumber: z.string({ message: 'Account address is Required' }),

  accountName: z.string({ message: 'Account Name is Required' }).optional(),

  cryptoNetworkId: z.string({ message: 'Please select network is Required' }).optional().nullable(),

  memo: z.string({ message: 'Memo is Required' }).optional().nullable(),
});

export type UpdatePaymentManagementForm = z.infer<
  typeof updatePaymentManagementSchema
>;
