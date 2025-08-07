import { z } from 'zod';
import { levelsSchema } from '../../../../../types/settings.type';

// Levels
export const levelsListSchema = levelsSchema;

export type LevelsData = z.infer<typeof levelsListSchema>;
