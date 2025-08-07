import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';

export const spinBonusSchema = z.object({
  id: z.string(),
  spinCount: z.number(),
  amount: z.number(),
  amountPayout: z.number(),
  status: StatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SpinBonusListData = z.infer<typeof spinBonusSchema>;

export const createSpinBonusSchema = spinBonusSchema
  .pick({
    spinCount: true,
    amount: true,
  })
  .extend({
    spinCount: z.number().int({ message: 'Spin Count is Required' }),
    amount: z.number().int({ message: 'Amount is Required' }),
  });

export type CreateSpinBonusForm = z.infer<typeof createSpinBonusSchema>;

export const updateSpinBonusSchema = createSpinBonusSchema;

export type UpdateSpinBonusForm = z.infer<typeof updateSpinBonusSchema>;
