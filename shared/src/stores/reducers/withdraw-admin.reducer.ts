import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateWithdrawAdminForm,
  UpdateWithdrawAdminForm,
  WithdrawAdminListData,
} from '../../types/withdraw-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWithdrawAdmin: builder.query<
        APIResponse<WithdrawAdminListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          word?: string;
          status?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-admin?${params}`,
          };
        },
        providesTags: ['WITHDRAW_ADMIN'],
      }),
      getWithdrawAdminDetail: builder.query<
        APIResponse<WithdrawAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-admin/${payload.id}`,
          };
        },
        providesTags: ['WITHDRAW_ADMIN_DETAIL'],
      }),

      createWithdrawAdmin: builder.mutation<
        APIResponse<WithdrawAdminListData>,
        CreateWithdrawAdminForm
      >({
        query: (payload) => {
          return {
            url: '/withdraw-admin/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['WITHDRAW_ADMIN'],
      }),

      updateWithdrawAdmin: builder.mutation<
        APIResponse<WithdrawAdminListData>,
        { id: string; data: UpdateWithdrawAdminForm }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-admin/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['WITHDRAW_ADMIN', 'WITHDRAW_ADMIN_DETAIL'],
      }),
      deleteWithdrawAdmin: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/withdraw-admin/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['WITHDRAW_ADMIN'],
      }),
      changeStatusWithdrawAdmin: builder.mutation<
        APIResponse<WithdrawAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-admin/change-status/${payload.id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['WITHDRAW_ADMIN_DETAIL', 'WITHDRAW_ADMIN'],
      }),
    };
  },
});

export const {
  useGetWithdrawAdminQuery,
  useGetWithdrawAdminDetailQuery,
  useCreateWithdrawAdminMutation,
  useUpdateWithdrawAdminMutation,
  useDeleteWithdrawAdminMutation,
  useChangeStatusWithdrawAdminMutation,
} = extendedProductApi;
