import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  TopWinnerListData,
  TopWinningGameListData,
} from '../../types/top-winning-games.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTopWinningGame: builder.query<
        APIResponse<TopWinningGameListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          search?: string;
          status?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/games/topwinning-games/lists?${params}`,
          };
        },
        providesTags: ['TOP_WINNING_GAMES'],
      }),
      getTopWinners: builder.query<
        APIResponse<TopWinnerListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          child_game_id: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/games/admin-games/child/topwinners?${params}`,
          };
        },
        providesTags: ['TOP_WINNING_GAME_WINNERS'],
      }),
    };
  },
});

export const { useGetTopWinningGameQuery, useGetTopWinnersQuery } =
  extendedProductApi;
