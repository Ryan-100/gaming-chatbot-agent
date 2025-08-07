import { z } from 'zod';

export const depositWithdrawAmountSchema = z.object({
  id: z.string(),
  type: z.string(),
  amount: z.number(),
  deposit: z.boolean(),
  withdraw: z.boolean(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DepositWithdrawAmountListData = z.infer<
  typeof depositWithdrawAmountSchema
>;

export const depositWithdrawAmountDetailSchem = depositWithdrawAmountSchema;
export type DepositWithdrawAmountDetailData = z.infer<
  typeof depositWithdrawAmountDetailSchem
>;

export const updateDepositWithdrawAmountSchema = z.object({
  amount: z.number().min(1, 'Enter a number greater than 0.'),
  deposit: z.boolean().optional(),
  withdraw: z.boolean().optional(),
});
export type UpdateDepositWithdrawAmountForm = z.infer<
  typeof updateDepositWithdrawAmountSchema
>;

export const createDepositWithdrawAmountSchema =
  updateDepositWithdrawAmountSchema.extend({
    type: z.string().optional(),
  });
export type CreateDepositWithdrawAmountForm = z.infer<
  typeof createDepositWithdrawAmountSchema
>;
