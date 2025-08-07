import { APIResponse } from '../../types/base.types';
import { apiSlice } from '../api.slice';
import {
  PaymentManagementListData,
  CreatePaymentManagementForm,
  UpdatePaymentManagementForm,
} from '../../types/payment-management.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPaymentManagements: builder.query<
        APIResponse<PaymentManagementListData[]>,
        { pageIndex?: number; rowPerPage?: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/admin-payment-account?${params}`,
            method: 'GET',
          };
        },
        providesTags: ['PAYMENT_MANAGEMENT'],
      }),
      getPaymentManagementDetail: builder.query<
        APIResponse<PaymentManagementListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/admin-payment-account/${payload.id}`,
            method: 'GET',
          };
        },
        providesTags: ['PAYMENT_MANAGEMENT_DETAIL'],
      }),
      getPaymentManagementsByCategory: builder.query<
        APIResponse<PaymentManagementListData[]>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/admin-payment-account/category-id/${payload.id}`,
            method: 'GET',
          };
        },
        providesTags: ['PAYMENT_MANAGEMENT'],
      }),
      createPaymentManagementAccount: builder.mutation<
        APIResponse<PaymentManagementListData>,
        CreatePaymentManagementForm
      >({
        query: (payload) => {
          return {
            url: '/admin-payment-account/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['PAYMENT_MANAGEMENT'],
      }),

      updatePaymentManagementAccount: builder.mutation<
        APIResponse<PaymentManagementListData>,
        { id: string; data: UpdatePaymentManagementForm }
      >({
        query: (payload) => {
          return {
            url: `/admin-payment-account/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['PAYMENT_MANAGEMENT', 'PAYMENT_MANAGEMENT_DETAIL'],
      }),
      deletePaymentManagementAccount: builder.mutation<
        APIResponse<void>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/admin-payment-account/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['PAYMENT_MANAGEMENT'],
      }),
    };
  },
});

export const {
  useGetPaymentManagementsQuery,
  useGetPaymentManagementDetailQuery,
  useGetPaymentManagementsByCategoryQuery,
  useCreatePaymentManagementAccountMutation,
  useUpdatePaymentManagementAccountMutation,
  useDeletePaymentManagementAccountMutation,
} = extendedProductApi;
