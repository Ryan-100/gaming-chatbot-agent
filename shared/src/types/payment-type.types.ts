import { z } from 'zod';

export const paymentTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']), // Adjust enum values as necessary
  isCrypto: z.boolean(),
  useNetwork: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdById: z.string(),
  updatedById: z.string().optional(),
  createdBy: z.object({
    name: z.string(),
    id: z.string(),
  }),
  updatedBy: z.object({
    name: z.string(),
    id: z.string(),
  }).optional(),
});

const paymentTypeListSchema = paymentTypeSchema.pick({
  id: true,
  name: true,
  status: true,
  isCrypto: true,
  useNetwork: true,
  createdAt: true,
  updatedAt: true,
  createdById: true,
  updatedById: true,
  createdBy: true,
  updatedBy: true,
});

export type PaymentTypeListData = z.infer<typeof paymentTypeListSchema>;

export const createPaymentTypeSchema = paymentTypeSchema
  .pick({
    name: true,
    isCrypto: true,
    useNetwork: true,
  })
  .extend({
    name: z.string({ message: 'Name is required' }),
    isCrypto: z.union([z.boolean(), z.string()]).refine(
      (val) => typeof val === 'boolean' || val === 'Fiat' || val === 'Crypto',
      {
        message: 'You must select whether the payment type is Crypto or Fiat',
      }),
    useNetwork: z.union([z.boolean(), z.string()]).optional(),
  });

export type CreatePaymentTypeForm = z.infer<typeof createPaymentTypeSchema>;

