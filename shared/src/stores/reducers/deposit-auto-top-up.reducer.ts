import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { DepositAutoTopUpListData } from '../../types/deposit-auto-top-up.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepositAutoTopUp: builder.query<
        APIResponse<DepositAutoTopUpListData>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          date?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-management/dashboard-auto-topup?${params}`,
          };
        },
        providesTags: ['DEPOSIT_AUTO_TOP_UP'],
      }),
    };
  },
});

export const { useGetDepositAutoTopUpQuery } = extendedProductApi;
