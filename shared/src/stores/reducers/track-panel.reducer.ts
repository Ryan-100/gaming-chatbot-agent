import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateTrackPanelForm,
  TrackPanelListData,
  UpdateTrackPanelForm,
} from '../../types/track-panel.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTrackPanel: builder.query<
        APIResponse<TrackPanelListData[]>,
        { pageIndex?: number; rowPerPage?: number; search?: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/track-panel?${params}`,
          };
        },
        providesTags: ['GAME_TRACKING_PANEL'],
      }),
      getTrackPanelDetail: builder.query<
        APIResponse<TrackPanelListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/track-panel/detail/${payload.id}`,
          };
        },
        providesTags: ['GAME_TRACKING_PANEL_DETAIL'],
      }),

      createTrackPanel: builder.mutation<
        APIResponse<TrackPanelListData>,
        CreateTrackPanelForm
      >({
        query: (payload) => {
          return {
            url: '/track-panel',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['GAME_TRACKING_PANEL'],
      }),
      updateTrackPanel: builder.mutation<
        APIResponse<TrackPanelListData>,
        UpdateTrackPanelForm
      >({
        query: (payload) => {
          return {
            url: `/track-panel`,
            body: payload,
            method: 'PUT',
          };
        },
        invalidatesTags: ['GAME_TRACKING_PANEL', 'GAME_TRACKING_PANEL_DETAIL'],
      }),
      deleteTrackPanel: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/track-panel/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['GAME_TRACKING_PANEL'],
      }),
    };
  },
});

export const {
  useGetTrackPanelQuery,
  useGetTrackPanelDetailQuery,
  useCreateTrackPanelMutation,
  useUpdateTrackPanelMutation,
  useDeleteTrackPanelMutation,
} = extendedProductApi;
