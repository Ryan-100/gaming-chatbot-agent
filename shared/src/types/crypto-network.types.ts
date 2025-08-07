import { z } from 'zod';
import { StatusEnum } from './backend-defined-enum.types';


export const cryptoNetworkSchema = z.object({
  id: z.string(),
  name: z.string(),
  requireMemo: z.boolean(),
  createdById: z.string(),
  updatedById: z.union([z.string(), z.null()]),
  status: StatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  CreatedBy: z.object({
    name: z.string(),
    id: z.string(),
  }),
  UpdatedBy: z.object({
    name: z.string(),
    id: z.string(),
  }).optional(),
})

export type CryptoNetworkListData = z.infer <typeof cryptoNetworkSchema>;

export const createCryptoNetworkSchema = cryptoNetworkSchema
  .pick({
    name: true,
    requireMemo: true,
  }).extend({
    name: z.string({ message: 'Name is required' }),
    requireMemo: z.union([z.boolean(), z.string()]).optional()
  });

export type CreateCryptoNetworkForm = z.infer <typeof createCryptoNetworkSchema>;

export const updateCryptoNetworkSchema = createCryptoNetworkSchema;

export type UpdateCryptoNetworkForm = z.infer <typeof updateCryptoNetworkSchema>;