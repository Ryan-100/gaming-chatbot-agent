import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  SettingSupportListData,
  UpdateSettingSupportForm,
} from '../../types/settings-support.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSettingSupport: builder.query<
        APIResponse<SettingSupportListData[]>,
        Record<string, never>
      >({
        query: (payload) => {
          return {
            url: `/setting/support-intro`,
          };
        },
        providesTags: ['SETTING_SUPPORT_INTRO'],
      }),
      updateSettingSupport: builder.mutation<
        APIResponse<UpdateSettingSupportForm>,
        { supportIntros: UpdateSettingSupportForm[] }
      >({
        query: (payload) => {
          return {
            url: `/setting/support-intro`,
            body: payload,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SETTING_SUPPORT_INTRO'],
      }),
    };
  },
});

export const { useGetSettingSupportQuery, useUpdateSettingSupportMutation } =
  extendedProductApi;
