import { z } from 'zod';

export const depositAdminSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  login_id: z.string(),
  password: z.string(),
  payment_type: z.string(),
  payment_account:z.string().optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
});

export type DepositAdminSchema = z.infer<typeof depositAdminSchema>;
export const depositAdminListSchema = z.array(depositAdminSchema);

export const withdrawAdminSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  login_id: z.string(),
  password: z.string(),
  payment_type: z.string(),
  payment_account:z.string().optional(),
  phone: z.string().optional(),
  from_range: z.number(),
  to_range: z.number(),
  status: z.string().optional(),
});

export type WithdrawAdminSchema = z.infer<typeof withdrawAdminSchema>;
export const withdrawAdminListSchema = z.array(withdrawAdminSchema);

export const serviceAdminSchema = depositAdminSchema;

export type ServiceAdminSchema = z.infer<typeof serviceAdminSchema>;
export const serviceAdminListSchema = z.array(serviceAdminSchema);

export const customAdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  login_id: z.string(),
  password: z.string(),
  payment_account:z.string().optional(),
  phone: z.string(),
  status: z.string(),
});

export type CustomAdminSchema = z.infer<typeof customAdminSchema>;
export const customAdminListSchema = z.array(customAdminSchema);

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  created_by: z.string(),
  status: z.string(),
  permissions: z.array(
    z.object({
      id: z.string(),
      module: z.string(),
    })
  ).optional(),
});

export type RoleSchema = z.infer<typeof roleSchema>;
export const roleListSchema = z.array(roleSchema);
