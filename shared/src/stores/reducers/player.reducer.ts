import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { PlayerDetailData, PlayerListData } from '../../types/player.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPlayer: builder.query<
        APIResponse<PlayerListData[]>,
        {
          pageIndex: number;
          rowPerPage: number;
          word?: string;
          status?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/player?${params}`,
          };
        },
        providesTags: ['PLAYERS'],
      }),
      getPlayerDetail: builder.query<
        APIResponse<PlayerDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/player/${payload.id}`,
          };
        },
        providesTags: ['PLAYER_DETAIL'],
      }),
      unlockPlayer: builder.mutation<
        APIResponse<PlayerListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/player/unlock/${payload.id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['PLAYER_DETAIL', 'PLAYERS'],
      }),
      unblockPlayer: builder.mutation<
        APIResponse<PlayerListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/player/unblock/${payload.id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['PLAYER_DETAIL', 'PLAYERS'],
      }),
      blockPlayer: builder.mutation<
        APIResponse<PlayerListData>,
        { id: string; data: { reason: string } }
      >({
        query: (payload) => {
          return {
            url: `/player/block/${payload.id}`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['PLAYER_DETAIL', 'PLAYERS'],
      }),
      changePasswordPlayer: builder.mutation<
        APIResponse<PlayerListData>,
        { id: string; data: { password: string } }
      >({
        query: (payload) => {
          return {
            url: `/player/change-password/${payload.id}`,
            body: payload.data,
            method: 'PUT',
          };
        },
        invalidatesTags: ['PLAYER_DETAIL', 'PLAYERS'],
      }),
    };
  },
});

export const {
  useGetPlayerQuery,
  useGetPlayerDetailQuery,
  useUnlockPlayerMutation,
  useUnblockPlayerMutation,
  useBlockPlayerMutation,
  useChangePasswordPlayerMutation,
} = extendedProductApi;
