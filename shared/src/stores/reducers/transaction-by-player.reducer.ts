import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { TransactionByPlayerListData } from '../../types/transaction-by-player.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionHistoryByPlayer: builder.query<
        APIResponse<TransactionByPlayerListData[]>,
        {
          pageIndex: number;
          rowPerPage: number;
          id: string;
          date: string;
          status: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/transactions/player/${payload.id}?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_BY_PLAYER'],
      }),
    };
  },
});

export const { useGetTransactionHistoryByPlayerQuery } = extendedProductApi;
