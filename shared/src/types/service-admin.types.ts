import { z } from 'zod';
import { customAdminSchema } from './custom-admin.types';

export const serviceAdminSchema = customAdminSchema;

export type ServiceAdminListData = z.infer<typeof serviceAdminSchema>;

export const createServiceAdminSchema = serviceAdminSchema
  .pick({
    name: true,
    phone: true,
    isActive: true,
  })
  .extend({
    password: z.string().min(6),
    roleId: z.string().optional(),
    isActive: z.boolean(),
  });

export type CreateServiceAdminForm = z.infer<typeof createServiceAdminSchema>;

export const updateServiceAdminSchema = createServiceAdminSchema.extend({
  password: z.string().optional(),
  isActive: z.boolean(),
});
export type UpdateServiceAdminForm = z.infer<typeof updateServiceAdminSchema>;
