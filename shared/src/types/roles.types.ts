import { z } from 'zod';
import { permissionSchema } from './permissions.types';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  CreatedBy:z.object({
    name:z.string(),
  }),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  RoleOnPermission: z.array(
    z.object({
      id: z.string(),
      permissionId: z.string(),
      roleId: z.string(),
      status: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      Permission: permissionSchema
    })
  )
})

export type RoleListData = z.infer<typeof roleSchema>;
 
export const createRoleSchema = z.object({
  name:z.string(),
  permissionList:z.union([
    z.array(z.string()).min(1),
    z.array(z.any()).min(1),
  ])
})

export type CreateRoleForm = z.infer<typeof createRoleSchema>;

export const editRoleSchema = createRoleSchema;
export type EditRoleForm = z.infer<typeof editRoleSchema>;