import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  OtpSettingData,
  OtpSettingEditForm,
} from '../../types/otp-settings.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getOtpSetting: builder.query<
        APIResponse<OtpSettingData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/setting/otp-setting`,
          };
        },
        providesTags: ['OTP_SETTINGS'],
      }),
      updateOtpSetting: builder.mutation<
        APIResponse<OtpSettingEditForm>,
        { data: OtpSettingEditForm }
      >({
        query: (payload) => {
          return {
            url: `/setting/otp-setting`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['OTP_SETTINGS'],
      }),
    };
  },
});

export const {
  useGetOtpSettingQuery,
  useUpdateOtpSettingMutation,
} = extendedProductApi;
