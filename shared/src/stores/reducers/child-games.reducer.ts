import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  ChildGameDetailData,
  ChildGameListData,
  UpdateChildGameForm,
} from '../../types/child-games.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getChildGame: builder.query<
        APIResponse<ChildGameListData[]>,
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
            url: `/games/admin-games/child/game/lists?${params}`,
          };
        },
        providesTags: ['CHILD_GAME'],
      }),
      getChildGameByMain: builder.query<
        APIResponse<ChildGameListData[]>,
        {
          main_game_id?: number | undefined;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/games/child-by-main/lists?${params}`,
          };
        },
        providesTags: ['CHILD_GAME'],
      }),
      getChildGameDetail: builder.query<
        APIResponse<ChildGameDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/child/${payload.id}`,
          };
        },
        providesTags: ['CHILD_GAME_DETAIL'],
      }),

      updateChildGame: builder.mutation<
        APIResponse<ChildGameListData>,
        { data: UpdateChildGameForm }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/child/edit`,
            body: payload.data,
            method: 'PUT',
          };
        },
        invalidatesTags: ['CHILD_GAME', 'CHILD_GAME_DETAIL'],
      }),
    };
  },
});

export const {
  useGetChildGameQuery,
  useGetChildGameByMainQuery,
  useGetChildGameDetailQuery,
  useUpdateChildGameMutation,
} = extendedProductApi;
