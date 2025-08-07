import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { IntervalReportData } from '../../types/report-interval.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDailyReports: builder.query<
        APIResponse<IntervalReportData>,
        {
          pageIndex: number;
          rowPerPage: number;
          date: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/daily-report?${params}`,
          };
        },
        providesTags: ['REPORT'],
      }),

      getMonthlyReports: builder.query<
        APIResponse<IntervalReportData>,
        {
          pageIndex: number;
          rowPerPage: number;
          date: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/monthly-report?${params}`,
          };
        },
        providesTags: ['REPORT'],
      }),

      getYearlyReports: builder.query<
        APIResponse<IntervalReportData>,
        {
          pageIndex: number;
          rowPerPage: number;
          date: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/yearly-report?${params}`,
          };
        },
        providesTags: ['REPORT'],
      }),
    };
  },
});

export const {
  useGetDailyReportsQuery,
  useGetMonthlyReportsQuery,
  useGetYearlyReportsQuery,
} = extendedProductApi;
