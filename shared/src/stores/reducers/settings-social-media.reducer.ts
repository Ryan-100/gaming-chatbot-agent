import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateSettingSocialMediaForm,
  SettingSocialMediaListData,
  UpdateSettingSocialMediaForm,
} from '../../types/settings-social-media.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSettingSocialMedia: builder.query<
        APIResponse<SettingSocialMediaListData[]>,
        { pageIndex?: number; rowPerPage?: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/setting/social-media?${params}`,
          };
        },
        providesTags: ['SETTING_SOCIAL_MEDIA'],
      }),
      getSettingSocialMediaDetail: builder.query<
        APIResponse<SettingSocialMediaListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/setting/social-media/${payload.id}`,
          };
        },
        providesTags: ['SETTING_SOCIAL_MEDIA_DETAIL'],
      }),

      createSettingSocialMedia: builder.mutation<
        APIResponse<SettingSocialMediaListData>,
        CreateSettingSocialMediaForm
      >({
        query: (payload) => {
          return {
            url: '/setting/social-media',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['SETTING_SOCIAL_MEDIA'],
      }),
      updateSettingSocialMedia: builder.mutation<
        APIResponse<SettingSocialMediaListData>,
        { id: string; data: UpdateSettingSocialMediaForm }
      >({
        query: (payload) => {
          return {
            url: `/setting/social-media/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SETTING_SOCIAL_MEDIA', 'SETTING_SOCIAL_MEDIA_DETAIL'],
      }),
      deleteSettingSocialMedia: builder.mutation<APIResponse<void>, { id: string }>(
        {
          query: (payload) => {
            return {
              url: `/setting/social-media/${payload.id}`,
              method: 'DELETE',
            };
          },
          invalidatesTags: ['SETTING_SOCIAL_MEDIA'],
        }
      ),
    };
  },
});

export const {
  useGetSettingSocialMediaQuery,
  useGetSettingSocialMediaDetailQuery,
  useCreateSettingSocialMediaMutation,
  useUpdateSettingSocialMediaMutation,
  useDeleteSettingSocialMediaMutation,
} = extendedProductApi;
