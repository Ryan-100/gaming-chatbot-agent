import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { BonusHistoryByPlayerListData } from '../../types/bonus-history.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getBonusHistoryByPlayer: builder.query<
        APIResponse<BonusHistoryByPlayerListData[]>,
        {
          id: string;
          query: {
            pageIndex: number;
            rowPerPage: number;
            date?: string;
            bonusStatus?: string;
          };
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload.query);
          return {
            url: `/player/bonus-histroy/${payload.id}?${params}`,
          };
        },
        providesTags: ['BONUS_HISTORY'],
      }),
    };
  },
});

export const { useGetBonusHistoryByPlayerQuery } = extendedProductApi;
