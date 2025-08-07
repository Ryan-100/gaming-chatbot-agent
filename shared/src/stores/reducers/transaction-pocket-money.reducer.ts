import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { TransactionPocketMoneyListData } from '../../types/transaction-pocket-money.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionPocketMoney: builder.query<
        APIResponse<TransactionPocketMoneyListData[]>,
        {
          pageIndex: number;
          rowPerPage: number;
          word?: string;
          filter?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/transactions/pocket-money?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_POCKET_MONEY'],
      }),
    };
  },
});

export const { useGetTransactionPocketMoneyQuery } = extendedProductApi;
