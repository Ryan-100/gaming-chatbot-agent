import { z } from 'zod';

export const splashScreenSchema = z.object({
  id: z.string(),
  themeType: z.string(),
  images: z.array(
    z.union([
      z.object({ id: z.string(), url: z.string(), type: z.string() }),
      z.object({ type: z.string(), colorCode: z.string() }),
    ])
  ),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SplashScreenData = z.infer<typeof splashScreenSchema>;

export const splashAdsSchema = z.object({
  id: z.string(),
  themeType: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      order: z.number(),
      redirectUrl: z.string(),
    })
  ),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SplashAdsData = z.infer<typeof splashAdsSchema>;

export const onboardingSchema = splashAdsSchema.omit({ images: true }).extend({
  images: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      order: z.number(),
      headline: z.string(),
      description: z.string(),
    })
  ),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;

export const updateThemSchema = z.object({
  id: z.string(),
  themeType: z.string(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        url: z.string().optional(),
        redirectUrl: z.string().optional(),
        order: z.number().optional(),
        type: z.string().optional(),
        headline: z.string().optional(),
        description: z.string().optional(),
        colorCode: z.string().optional(),
      })
    )
    .optional(),
});

export type UpdateThemeData = z.infer<typeof updateThemSchema>;
