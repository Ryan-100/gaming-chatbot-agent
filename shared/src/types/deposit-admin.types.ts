import { z } from 'zod';
import { paymentManagementSchema } from './payment-management.types';

export const topupAccountHolderSchema = z.object({
  id: z.string(),
  adminId: z.string(),
  paymentAccountId: z.string(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  PaymentAccount: paymentManagementSchema,
});

export const depositAdminSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().nullable(),
  phone: z.string(),
  password: z.string().min(6),
  agentCode: z.string(),
  roleId: z.string().nullable(),
  profileImage: z.string().nullable(),
  AdminStatus: z.enum(['ACTIVE', 'INACTIVE']),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  TopupAccountHolder: z.array(topupAccountHolderSchema),
  paymentAccountIds: z.union([
    z.array(z.string()).min(1),
    z.array(z.any()).min(1),
  ]),
  isActive: z.boolean(),
});

const depositAdminListSchema = depositAdminSchema.omit({
  paymentAccountIds: true,
});

export type DepositAdminListData = z.infer<typeof depositAdminListSchema>;

//create
export const createDepositAdminSchema = depositAdminSchema
  .pick({
    name: true,
    password: true,
    paymentAccountIds: true,
    isActive: true,
  })
  .extend({
    category: z.any().optional(),
    paymentAccountIds: z.union([
      z.array(z.string()).min(1),
      z.array(z.any()).min(1),
    ]),
  });
export type CreateDepositAdminForm = z.infer<typeof createDepositAdminSchema>;

//edit
export const updateDepositAdminSchema = createDepositAdminSchema.extend({
  password: z.string().optional(),
  agentCode: z.string().optional(),
  isActive: z.boolean(),
});
export type UpdateDepositAdminForm = z.infer<typeof updateDepositAdminSchema>;
