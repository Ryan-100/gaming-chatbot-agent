import { z } from 'zod';
import { fileSchema } from './file-upload.types';

export const customAdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  agentCode: z.string(),
  AdminStatus: z.string(),
  Image: fileSchema,
  Role: z.object({
    id: z.string(),
    name: z.string(),
    RoleOnPermission: z.array(
      z.object({
        id: z.string(),
        Permission: z.object({
          id: z.string(),
          name: z.string(),
          route: z.string(),
        }),
      })
    ),
  }),
  isActive: z.boolean(),
});

export type CustomAdminListData = z.infer<typeof customAdminSchema>;

export const createCustomAdminSchema = customAdminSchema
  .pick({
    name: true,
    phone: true,
    isActive: true,
  })
  .extend({
    password: z.string().min(6),
    roleId: z.string(),
    isActive: z.boolean(),
  });

export type CreateCustomAdminForm = z.infer<typeof createCustomAdminSchema>;

export const updateCustomAdminSchema = createCustomAdminSchema.extend({
  password: z.string().optional(),
});
export type UpdateCustomAdminForm = z.infer<typeof updateCustomAdminSchema>;
