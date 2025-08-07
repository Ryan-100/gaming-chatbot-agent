import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { HotGameListData } from '../../types/hot-games.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getHotGame: builder.query<
        APIResponse<HotGameListData[]>,
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
            url: `/games/admin-games/hot/lists?${params}`,
          };
        },
        providesTags: ['HOT_GAMES'],
      }),

      createHotGame: builder.mutation<
        APIResponse<HotGameListData>,
        { main_game_id: string; child_game_id?: string | undefined }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/hot/add`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['HOT_GAMES'],
      }),
      sortHotGame: builder.mutation<
        APIResponse<HotGameListData>,
        { hotId: string; sorting: number }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/hot/sort`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['HOT_GAMES'],
      }),
      swapHotGame: builder.mutation<
        APIResponse<HotGameListData>,
        { oldChildGameId: string; newChildGameId: string }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/hot/swap`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['HOT_GAMES'],
      }),
      deleteHotGame: builder.mutation<APIResponse<void>, { id: number }>({
        query: (payload) => {
          return {
            url: `/games/admin-games/hot/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['HOT_GAMES'],
      }),
    };
  },
});

export const {
  useGetHotGameQuery,
  useCreateHotGameMutation,
  useSortHotGameMutation,
  useSwapHotGameMutation,
  useDeleteHotGameMutation,
} = extendedProductApi;
