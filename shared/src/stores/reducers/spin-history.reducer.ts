import { apiSlice } from '../api.slice';
import {
  SpinHistoryListData,
  DailySpinHistoryListData,
  SpinHistorySettingData,
} from '../../types/spin-history.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { APIResponse } from '../../types/base.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {

      getSpinHistoryList: builder.query<
        APIResponse<SpinHistoryListData[]>,
        { date: string }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          const url = payload.date
            ? `/spin-management/admin-spin-history?${params}`
            : '/spin-management/admin-spin-history';
          return {
            url,
          };
        },
        providesTags: ['SPIN_HISTORY'],
      }),

      getDailySpinHistoryList: builder.query<
        APIResponse<DailySpinHistoryListData[]>,
        { date: string; pageIndex: number; rowPerPage:number }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/spin-management/admin-spin-history-detail?${params}`,
          };
        },
        providesTags: ['SPIN_HISTORY_DETAILS'],
      }),

      getSpinHistorySetting: builder.query<
        APIResponse<SpinHistorySettingData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/spin-management/admin-spin-history-setting/${payload?.id}`,
          };
        },
        providesTags: ['SPIN_HISTORY_DETAILS'],
      }),

    };
  },
});

export const {
  useGetSpinHistoryListQuery,
  useGetDailySpinHistoryListQuery,
  useGetSpinHistorySettingQuery,
} = extendedProductApi;
