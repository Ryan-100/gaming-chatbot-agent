import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreatePaymentTypeForm,
  PaymentTypeListData,
} from '../../types/payment-type.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPaymentTypes: builder.query<
        APIResponse<PaymentTypeListData[]>,
        void
      >({
        query: (payload) => {
          // const params = objectToQueryString(payload);
          return {
            url: `/payment-type`,
          };
        },
        providesTags: ['PAYMENT_TYPE'],
      }),
      getPaymentTypeDetail: builder.query<
        APIResponse<PaymentTypeListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/payment-type/${payload.id}`,
          };
        },
        providesTags: ['PAYMENT_TYPE_DETAIL'],
      }),
      createPaymentType: builder.mutation<
        APIResponse<PaymentTypeListData>,
        CreatePaymentTypeForm
      >({
        query: (payload) => {
          return {
            url: `/payment-type/create`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['PAYMENT_TYPE'],
      }),
      
      deletePaymentType: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/payment-type/delete/${payload.id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['PAYMENT_TYPE'],
      }),
    };
  },
});

export const {
  useGetPaymentTypesQuery,
  useGetPaymentTypeDetailQuery,
  useCreatePaymentTypeMutation,
  useDeletePaymentTypeMutation,
} = extendedProductApi;
