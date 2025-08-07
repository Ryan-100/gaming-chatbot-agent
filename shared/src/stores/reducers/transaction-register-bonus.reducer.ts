import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { TransactionRegisterBonusListData } from '../../types/transaction-register-bonus.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTransactionRegisterBonus: builder.query<
        APIResponse<TransactionRegisterBonusListData[]>,
        { pageIndex: number; rowPerPage: number; word?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/transactions/register-bonus?${params}`,
          };
        },
        providesTags: ['TRANSACTIONS_REGISTER_BONUS'],
      }),
    };
  },
});

export const { useGetTransactionRegisterBonusQuery } = extendedProductApi;
