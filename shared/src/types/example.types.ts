import { z } from 'zod';
import { MetaResponse } from './base.types';
export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.any(),
  order: z.number(),
  is_publish: z.boolean(),
  created_at: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

export interface CategoryResponse {
  message: string;
  category: MetaResponse<Category[]>;
  code: number;
}

export interface CategoryDetailResponse {
  message: string;
  category: Category;
  code: number;
}

export const createCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
});

export type CreateCategoryForm = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  order: z.number(),
  is_publish: z.boolean(),
});

export type UpdateCategoryForm = z.infer<typeof updateCategorySchema>;
