import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  OnboardingData,
  SplashAdsData,
  SplashScreenData,
  UpdateThemeData,
} from '../../types/themes.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSplashScreen: builder.query<
        APIResponse<SplashScreenData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/theme?type=SPLASH_SCREEN`,
          };
        },
        providesTags: ['SPLASH_SCREEN'],
      }),
      updateSplashScreen: builder.mutation<
        APIResponse<UpdateThemeData>,
        UpdateThemeData
      >({
        query: (payload) => {
          return {
            url: `theme/update`,
            method: 'PATCH',
            body: payload,
          };
        },
        invalidatesTags: ['SPLASH_SCREEN'],
      }),
      getSplashAds: builder.query<
        APIResponse<SplashAdsData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/theme?type=SPLASH_ADS`,
          };
        },
        providesTags: ['SPLASH_ADS'],
      }),
      updateSplashAds: builder.mutation<
        APIResponse<UpdateThemeData>,
        UpdateThemeData
      >({
        query: (payload) => {
          return {
            url: `theme/update`,
            method: 'PATCH',
            body: payload,
          };
        },
        invalidatesTags: ['SPLASH_ADS'],
      }),
      getOnboarding: builder.query<
        APIResponse<OnboardingData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/theme?type=ONBOARDING`,
          };
        },
        providesTags: ['ONBOARDING'],
      }),
      updateOnboarding: builder.mutation<
        APIResponse<UpdateThemeData>,
        UpdateThemeData
      >({
        query: (payload) => {
          return {
            url: `theme/update`,
            method: 'PATCH',
            body: payload,
          };
        },
        invalidatesTags: ['ONBOARDING'],
      }),
    };
  },
});

export const {
  useGetSplashScreenQuery,
  useUpdateSplashScreenMutation,
  useGetSplashAdsQuery,
  useUpdateSplashAdsMutation,
  useGetOnboardingQuery,
  useUpdateOnboardingMutation,
} = extendedProductApi;
