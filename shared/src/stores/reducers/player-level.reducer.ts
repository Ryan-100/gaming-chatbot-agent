import { apiSlice } from '../api.slice';
import {
  CreatePlayerLevelForm,
  PlayerLevelListData,
  UpdatePlayerLevelForm,
} from '../../types/player-level.types';
// import { objectToQueryString } from '../../utils/objectToQueryString';
import { APIResponse } from '../../types/base.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPlayerLevels: builder.query<
        APIResponse<PlayerLevelListData[]>,
        void
      >({
        query: (payload) => {
          // const params = objectToQueryString(payload);
          return {
            url: `/player-level`,
          };
        },
        providesTags: ['PLAYER_LEVEL'],
      }),

      getPlayerLevelDetail: builder.query<
        APIResponse<PlayerLevelListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/player-level/${payload.id}`,
            method: 'GET',
          };
        },
        providesTags: ['PLAYER_LEVEL'],
      }),

      createPlayerLevel: builder.mutation<
        APIResponse<PlayerLevelListData>,
        CreatePlayerLevelForm
      >({
        query: (payload) => {
          return {
            url: `/player-level/create`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['PLAYER_LEVEL'],
      }),

      updatePlayerLevel: builder.mutation<
        APIResponse<void>,
        { id: string; data: UpdatePlayerLevelForm }
      >({
        query: (payload) => {
          return {
            url: `/player-level/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['PLAYER_LEVEL'],
      }),

      deletePlayerLevel: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/player-level/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['PLAYER_LEVEL'],
      }),
    };
  },
});

export const {
  useGetPlayerLevelsQuery,
  useGetPlayerLevelDetailQuery,
  useCreatePlayerLevelMutation,
  useUpdatePlayerLevelMutation,
  useDeletePlayerLevelMutation,
} = extendedProductApi;
