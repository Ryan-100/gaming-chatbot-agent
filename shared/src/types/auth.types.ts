import { z } from 'zod';
import { fileSchema } from './file-upload.types';

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  rememberMe: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenData = z.infer<typeof tokenSchema>;

export const adminLoginSchema = z.object({
  id: z.string(),
  device: z.string(),
  ipAddress: z.string(),
  location: z.string(),
  loginTime: z.string(),
  logoutTime: z.string().optional(),
  loginStatus: z.string(),
  adminId: z.string(),
  token: z.string(),
  refreshToken: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AdminLoginListData = z.infer<typeof adminLoginSchema>;

export const permissionSchema = z.object({
  Permission: z.object({ name: z.string(), route: z.string() }),
});

export type PermissionData = z.infer<typeof permissionSchema>;

export const roleSchema = z.object({
  name: z.string(),
  RoleOnPermission: z.array(permissionSchema),
});

export const meSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  password: z.string(),
  agentCode: z.string(),
  roleId: z.string(),
  imageId: z.string().optional(),
  Image: fileSchema,
  AdminStatus: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  Role: roleSchema,
  AdminLoginActivity: z.array(adminLoginSchema).optional(),
});

export type MeData = z.infer<typeof meSchema>;

export const updateMeSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});

export type UpdateMeForm = z.infer<typeof updateMeSchema>;
