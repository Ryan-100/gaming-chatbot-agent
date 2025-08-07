import { z } from 'zod';
import { customAdminSchema, depositAdminSchema, roleSchema, serviceAdminSchema, withdrawAdminSchema } from '../../../../types/admin.types';

//depositAdmin
export const depositAdminListSchema = depositAdminSchema;

export type DepositAdminData = z.infer<typeof depositAdminListSchema>;

//withdrawAdmin
export const withdrawAdminListSchema = withdrawAdminSchema;

export type WithdrawAdminData = z.infer<typeof withdrawAdminListSchema>;

//serviceAdmin
export const serviceAdminListSchema = serviceAdminSchema;

export type ServiceAdminData = z.infer<typeof serviceAdminListSchema>;

//customAdmin
export const customAdminListSchema = customAdminSchema;

export type CustomAdminData = z.infer<typeof customAdminListSchema>;

//role
export const roleListSchema = roleSchema;

export type RoleData = z.infer<typeof roleListSchema>;
