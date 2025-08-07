import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreatePaymentCategoryForm,
  PaymentCategoryListData,
  UpdatePaymentCategoryForm,
} from '../../types/payment-category.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPaymentCategory: builder.query<
        APIResponse<PaymentCategoryListData[]>,
        { pageIndex?: number; rowPerPage?: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/payment-category?${params}`,
          };
        },
        providesTags: ['PAYMENT_CATEGORY'],
      }),
      getPaymentCategoryDetail: builder.query<
        APIResponse<PaymentCategoryListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/payment-category/${payload.id}`,
          };
        },
        providesTags: ['PAYMENT_CATEGORY_DETAIL'],
      }),

      createPaymentCategory: builder.mutation<
        APIResponse<PaymentCategoryListData>,
        CreatePaymentCategoryForm
      >({
        query: (payload) => {
          return {
            url: '/payment-category/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['PAYMENT_CATEGORY'],
      }),
      updatePaymentCategory: builder.mutation<
        APIResponse<PaymentCategoryListData>,
        { id: string; data: UpdatePaymentCategoryForm }
      >({
        query: (payload) => {
          return {
            url: `/payment-category/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['PAYMENT_CATEGORY', 'PAYMENT_CATEGORY_DETAIL'],
      }),
      deletePaymentCategory: builder.mutation<
        APIResponse<void>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/payment-category/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['PAYMENT_CATEGORY'],
      }),
    };
  },
});

export const {
  useGetPaymentCategoryQuery,
  useGetPaymentCategoryDetailQuery,
  useCreatePaymentCategoryMutation,
  useUpdatePaymentCategoryMutation,
  useDeletePaymentCategoryMutation,
} = extendedProductApi;
