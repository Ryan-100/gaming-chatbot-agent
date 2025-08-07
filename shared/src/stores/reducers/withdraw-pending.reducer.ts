import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { WithdrawPendingListData } from '../../types/withdraw-pending.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWithdrawPending: builder.query<
        APIResponse<WithdrawPendingListData[]>,
        { pageIndex: number; rowPerPage: number; word?: string; status: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-management?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_WITHDRAW'],
      }),
      getWithdrawPendingDetail: builder.query<
        APIResponse<WithdrawPendingListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-management/${payload.id}`,
          };
        },
        providesTags: ['TRANSACTIONS_WITHDRAW_DETAIL'],
      }),
      approveWithdrawPending: builder.mutation<
        APIResponse<WithdrawPendingListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-management/approve/${payload.id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'TRANSACTIONS_WITHDRAW_DETAIL',
          'TRANSACTIONS_WITHDRAW',
          'WITHDRAW_DASHBOARD',
          'WITHDRAW_REPORT',
        ],
      }),
      rejectWithdrawPending: builder.mutation<
        APIResponse<WithdrawPendingListData>,
        { id: string; data: { reason: string } }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-management/reject/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'TRANSACTIONS_WITHDRAW_DETAIL',
          'TRANSACTIONS_WITHDRAW',
          'WITHDRAW_DASHBOARD',
          'WITHDRAW_REPORT',
        ],
      }),
    };
  },
});

export const {
  useGetWithdrawPendingQuery,
  useGetWithdrawPendingDetailQuery,
  useApproveWithdrawPendingMutation,
  useRejectWithdrawPendingMutation,
} = extendedProductApi;
