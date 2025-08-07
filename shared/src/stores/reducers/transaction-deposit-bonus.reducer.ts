import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import {
  TransactionDepositBonusListData,
} from '../../types/transaction-deposit-bonus.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionDepositBonus: builder.query<
        APIResponse<TransactionDepositBonusListData[]>,
        { pageIndex: number; rowPerPage: number; word?: string; }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/transactions/deposit-bonus?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_DEPOSIT_BONUS'],
      })
    };
  },
});

export const {
  useGetTransactionDepositBonusQuery,
} = extendedProductApi;
