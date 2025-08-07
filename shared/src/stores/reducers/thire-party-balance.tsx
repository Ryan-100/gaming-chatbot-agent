import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ThirdPartyBalanceData } from '../../types/third-party-balance.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getThirdPartyBalance: builder.query<
        APIResponse<ThirdPartyBalanceData>,
        void
      >({
        query: () => {
          return {
            url: `/games/check-credit`,
            method: 'GET',
          };
        },
        providesTags: ['THIRD_PARTY_BALANCE'],
      }),
    };
  },
});

export const { useGetThirdPartyBalanceQuery } = extendedProductApi;
