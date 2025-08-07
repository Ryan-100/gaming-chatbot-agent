import { z } from 'zod';

export const exchangeRateSchema = z.object({
  id: z.string(),
  amountPerUsdt: z.number(),
  action: z.enum(['DEPOSIT', 'WITHDRAW']),
  updatedAt: z.date(),
  updatedById: z.string(),
  currency: z.string(),
});
export type ExchangeRateData = z.infer<typeof exchangeRateSchema>;

export const exchangeCurrencySchema = z.object({
  key: z.string(),
  value: z.string(),
});
export type ExchangeCurrencyData = z.infer<typeof exchangeCurrencySchema>;

export const createExchangeRateSchema = exchangeRateSchema.pick({
  amountPerUsdt: true,
});

export type CreateExchangeRateForm = z.infer<typeof createExchangeRateSchema>;

export type CreateExchangeRateFormWithAction = CreateExchangeRateForm & {
  action: 'DEPOSIT' | 'WITHDRAW';
};

export const updateExchangeRateSchema = exchangeRateSchema
  .pick({
    amountPerUsdt: true,
    action: true,
  })
  .extend({
    amountPerUsdt: z.number({ message: 'Amount is required' }),
    action: z.enum(['DEPOSIT', 'WITHDRAW']).catch('DEPOSIT'),
  });

export type UpdateExchangeRateForm = z.infer<typeof updateExchangeRateSchema>;
