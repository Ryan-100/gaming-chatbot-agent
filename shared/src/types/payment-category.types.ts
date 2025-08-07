import { z } from 'zod';
import { paymentTypeSchema } from './payment-type.types';
import { fileSchema } from './file-upload.types';

export const paymentCategorySchema = z.object({
  id: z.string(),
  imageId: z.string().nullable(),
  accountType: z.string(), //category name
  showQR: z.boolean(),
  order: z.number(),
  transactionDigitCount: z.number(),
  paymentTypeId: z.string(),
  isPublish: z.boolean(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdById: z.string(),
  updatedById: z.string().optional(),
  File: fileSchema.optional(),
  PaymentType: paymentTypeSchema,
  createdBy: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  updatedBy: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
});

const paymentCategoryListSchema = paymentCategorySchema;

export type PaymentCategoryListData = z.infer<typeof paymentCategoryListSchema>;

export const createPaymentCategorySchema = paymentCategorySchema
  .pick({
    order: true,
    accountType: true,
    paymentTypeId: true,
    transactionDigitCount: true,
    isPublish: true,
  })
  .extend({
    order: z.number().int({ message: 'Sorting No. is Required' }),
    accountType: z
      .string({ message: 'Account Type is Required' })
      .min(1, { message: 'Account Type must be at least 1 characters long' }),
    paymentTypeId: z.string({ message: 'Payment Type is Required' }),
    transactionDigitCount: z
      .number()
      .int({ message: 'Count is Required' })
      .min(1)
      .max(9)
      .optional(),
    isPublish: z.union([
      z.string(),
      z.boolean({ message: 'Choose one for publish' }),
    ]),
  });
export type CreatePaymentCategoryForm = z.infer<
  typeof createPaymentCategorySchema
>;

export const updatePaymentCategorySchema = paymentCategorySchema
  .pick({
    order: true,
    accountType: true,
    transactionDigitCount: true,
    isPublish: true,
  })
  .extend({
    order: z.number().int({ message: 'Sorting No. is Required' }),
    accountType: z
      .string({ message: 'Account Type is Required' })
      .min(1, { message: 'Account Type must be at least 1 characters long' }),
    transactionDigitCount: z
      .number()
      .int({ message: 'Count is Required' })
      .min(1)
      .max(9)
      .optional(),
    isPublish: z.union([
      z.string(),
      z.boolean({ message: 'Choose one for publishment' }),
    ]),
  });

export type UpdatePaymentCategoryForm = z.infer<
  typeof updatePaymentCategorySchema
>;
