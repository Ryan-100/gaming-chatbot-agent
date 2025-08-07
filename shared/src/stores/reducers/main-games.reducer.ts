import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  MainGameDetailData,
  MainGameListData,
  UpdateMainGameForm,
  UpdateMaintenanceForm,
} from '../../types/main-games.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getMainGame: builder.query<
        APIResponse<MainGameListData[]>,
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
            url: `/games/admin-games/main/lists?${params}`,
          };
        },
        providesTags: ['MAIN_GAME'],
      }),
      getMainGameDetail: builder.query<
        APIResponse<MainGameDetailData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/main/${payload.id}`,
          };
        },
        providesTags: ['MAIN_GAME_DETAIL'],
      }),

      updateGameMaintenance: builder.mutation<
        APIResponse<UpdateMaintenanceForm>,
        { data: UpdateMaintenanceForm }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/main/maintenance`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['MAIN_GAME', 'MAIN_GAME_DETAIL'],
      }),

      updateMainGame: builder.mutation<
        APIResponse<MainGameListData>,
        { data: UpdateMainGameForm }
      >({
        query: (payload) => {
          return {
            url: `/games/admin-games/main/edit`,
            body: payload.data,
            method: 'PUT',
          };
        },
        invalidatesTags: ['MAIN_GAME', 'MAIN_GAME_DETAIL'],
      }),
    };
  },
});

export const {
  useGetMainGameQuery,
  useGetMainGameDetailQuery,
  useUpdateGameMaintenanceMutation,
  useUpdateMainGameMutation,
} = extendedProductApi;
