import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { TransactionGameListData } from '../../types/transaction-games.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionGame: builder.query<
        APIResponse<TransactionGameListData[]>,
        { pageIndex: number; rowPerPage: number; search?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/transactions/game/transactions?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_GAMES'],
      }),
    };
  },
});

export const { useGetTransactionGameQuery } = extendedProductApi;
