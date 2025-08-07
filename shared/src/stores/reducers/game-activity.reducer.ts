import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { GameActivityByPlayerListData } from '../../types/game-activity.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getGameActivityByPlayer: builder.query<
        APIResponse<GameActivityByPlayerListData[]>,
        {
          id: string;
          pageIndex: number;
          rowPerPage: number;
          date?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/player/game-activity/${payload.id}?${params}`,
          };
        },
        providesTags: ['GAME_ACTIVITY'],
      }),
    };
  },
});

export const { useGetGameActivityByPlayerQuery } = extendedProductApi;
