import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import {
  TransactionsWithdrawDetailData,
  TransactionsWithdrawListData,
} from '../../types/transactions-withdraw.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionsWithdraw: builder.query<
        APIResponse<TransactionsWithdrawListData[]>,
        {
          pageIndex: number;
          rowPerPage: number;
          word?: string;
          status: string;
          date?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-management?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_WITHDRAW'],
      }),
      getTransactionsWithdrawDetail: builder.query<
        APIResponse<TransactionsWithdrawDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/withdraw-management/${payload.id}`,
          };
        },
        providesTags: ['TRANSACTIONS_WITHDRAW_DETAIL'],
      }),
      approveTransactionsWithdraw: builder.mutation<
        APIResponse<TransactionsWithdrawListData>,
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
      rejectTransactionsWithdraw: builder.mutation<
        APIResponse<TransactionsWithdrawListData>,
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
  useGetTransactionsWithdrawQuery,
  useGetTransactionsWithdrawDetailQuery,
  useApproveTransactionsWithdrawMutation,
  useRejectTransactionsWithdrawMutation,
} = extendedProductApi;
