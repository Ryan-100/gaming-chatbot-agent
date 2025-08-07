import { z } from 'zod';

export const paymentManagementSchema = z.object({
  sort_no: z.string().optional(),
  account_type: z.string(),
  account_name: z.string().optional(),
  account_number: z.string(),
  user_level: z.string(),
  is_publish: z.enum(['Yes', 'No']),
  is_screenshot: z.enum(['Yes', 'No']),
  qr_code: z.string(),
});

export type PaymentManagementSchema = z.infer<typeof paymentManagementSchema>;
export const paymentManagementListSchema = z.array(paymentManagementSchema);

export const paymentCategorySchema = z.object({
  sort_no: z.string().optional(),
  account_type: z.string(),
  category_type: z.string(),
  trx_no: z.number().optional(),
  is_publish: z.enum(['Yes', 'No']),
  show_qr: z.enum(['Yes', 'No']),
  created_at: z.string().optional(),
  created_by: z
    .array(
      z.object({
        admin_id: z.string(),
        admin_name: z.string(),
      })
    )
    .optional(),
});

export type PaymentCategorySchema = z.infer<typeof paymentCategorySchema>;
export const paymentCategoryListSchema = z.array(paymentCategorySchema);

export const ExchangeRateHistorySchema = z.object({
  rate: z.number(),
  updated_at: z.string(),
});

export const exchangeRateHistoryListSchema = z.array(ExchangeRateHistorySchema);

export const depositExchangeRatesSchema = z.object({
  current_rate: z.number(),
  updated_at: z.string(),
  history: exchangeRateHistoryListSchema,
});

export type DepositExchangeRatesSchema = z.infer<
  typeof depositExchangeRatesSchema
>;

export const withdrawExchangeRatesSchema = z.object({
  current_rate: z.number(),
  updated_at: z.string(),
  history: exchangeRateHistoryListSchema,
});

export type WithdrawExchangeRatesSchema = z.infer<
  typeof withdrawExchangeRatesSchema
>;
