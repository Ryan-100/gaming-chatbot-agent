import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import {
  TransactionsDepositDetailData,
  TransactionsDepositListData,
} from '../../types/transactions-deposit.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionsDeposit: builder.query<
        APIResponse<TransactionsDepositListData[]>,
        {
          pageIndex: number;
          rowPerPage: number;
          word: string;
          status: string;
          date: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-management?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_DEPOSIT'],
      }),
      getTransactionsDepositDetail: builder.query<
        APIResponse<TransactionsDepositDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/deposit-management/${payload.id}`,
          };
        },
        providesTags: ['TRANSACTIONS_DEPOSIT_DETAIL'],
      }),
      approveTransactionsDeposit: builder.mutation<
        APIResponse<TransactionsDepositListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/deposit-management/approve/${payload.id}`,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'TRANSACTIONS_DEPOSIT_DETAIL',
          'TRANSACTIONS_DEPOSIT',
          'DEPOSIT_AUTO_TOP_UP',
          'DEPOSIT_DASHBOARD_REQUESTS',
          'DEPOSIT_RECORD_HISTORY',
          'DEPOSIT_DASHBOARD_DETAIL_TABLE',
        ],
      }),
      rejectTransactionsDeposit: builder.mutation<
        APIResponse<TransactionsDepositListData>,
        { id: string; data: { reason: string } }
      >({
        query: (payload) => {
          return {
            url: `/deposit-management/reject/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'TRANSACTIONS_DEPOSIT_DETAIL',
          'TRANSACTIONS_DEPOSIT',
          'DEPOSIT_AUTO_TOP_UP',
          'DEPOSIT_DASHBOARD_REQUESTS',
          'DEPOSIT_RECORD_HISTORY',
          'DEPOSIT_DASHBOARD_DETAIL_TABLE',
        ],
      }),
    };
  },
});

export const {
  useGetTransactionsDepositQuery,
  useGetTransactionsDepositDetailQuery,
  useApproveTransactionsDepositMutation,
  useRejectTransactionsDepositMutation,
} = extendedProductApi;
