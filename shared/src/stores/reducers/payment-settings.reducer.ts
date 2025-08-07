import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  PaymentSettingData,
  PaymentSettingEditForm,
} from '../../types/payment-settings.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPaymentSetting: builder.query<
        APIResponse<PaymentSettingData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/setting/payment-setting`,
          };
        },
        providesTags: ['PAYMENT_SETTINGS'],
      }),
      updatePaymentSetting: builder.mutation<
        APIResponse<PaymentSettingEditForm>,
        { data: PaymentSettingEditForm }
      >({
        query: (payload) => {
          return {
            url: `/setting/payment-setting`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['PAYMENT_SETTINGS'],
      }),
    };
  },
});

export const {
  useGetPaymentSettingQuery,
  useUpdatePaymentSettingMutation,
} = extendedProductApi;
