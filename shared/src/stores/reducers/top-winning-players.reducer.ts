import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { TopWinningPlayerListData } from '../../types/top-winning-players.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTopWinningPlayers: builder.query<
        APIResponse<TopWinningPlayerListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          search?: string;
          date?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/games/topwinner/players?${params}`,
          };
        },
        providesTags: ['TOP_WINNING_PLAYERS'],
      }),
    };
  },
});

export const { useGetTopWinningPlayersQuery } = extendedProductApi;
