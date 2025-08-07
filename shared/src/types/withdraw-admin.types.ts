import { z } from 'zod';
import { depositAdminSchema } from './deposit-admin.types';
import { paymentManagementSchema } from './payment-management.types';

export const withdrawAccountHolderSchema = z.object({
  id: z.string(),
  adminId: z.string(),
  paymentAccountId: z.string(),
  minAmount: z.number(),
  maxAmount: z.number(),
  totalAccepted: z.number(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  PaymentAccount: paymentManagementSchema,
});

const withdrawAdminSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().optional(),
  phone: z.string(),
  password: z.string().min(6),
  agentCode: z.string(),
  roleId: z.string().optional(),
  profileImage: z.string().optional(),
  AdminStatus: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  WithdrawAccountHolder: z.array(withdrawAccountHolderSchema),
  isActive: z.boolean(),
});

export type WithdrawAdminListData = z.infer<typeof withdrawAdminSchema>;

//create
export const createWithdrawAdminSchema = depositAdminSchema
  .pick({
    name: true,
    password: true,
    paymentAccountIds: true,
    isActive: true,
  })
  .extend({
    minAmount: z.number(),
    maxAmount: z.number().min(1),
    category: z.any().optional(),
    paymentAccountIds: z.union([
      z.array(z.string()).min(1),
      z.array(z.any()).min(1),
    ]),
  });
export type CreateWithdrawAdminForm = z.infer<typeof createWithdrawAdminSchema>;

//edit
export const updateWithdrawAdminSchema = createWithdrawAdminSchema.extend({
  password: z.string().optional(),
  agentCode: z.string().optional(),
  isActive: z.boolean(),
});
export type UpdateWithdrawAdminForm = z.infer<typeof updateWithdrawAdminSchema>;
