import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  ApplicationSettingData,
  ApplicationSettingEditForm,
} from '../../types/application-settings.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getApplicationSetting: builder.query<
        APIResponse<ApplicationSettingData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/setting/application-setting`,
          };
        },
        providesTags: ['APPLICATION_SETTINGS'],
      }),
      updateApplicationSetting: builder.mutation<
        APIResponse<ApplicationSettingEditForm>,
        { data: ApplicationSettingEditForm }
      >({
        query: (payload) => {
          return {
            url: `/setting/application-setting`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['APPLICATION_SETTINGS'],
      }),
    };
  },
});

export const {
  useGetApplicationSettingQuery,
  useUpdateApplicationSettingMutation,
} = extendedProductApi;
