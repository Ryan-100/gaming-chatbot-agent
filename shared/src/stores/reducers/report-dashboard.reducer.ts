import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ReportDashboardData } from '../../types/report-dashboard.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportDashboard: builder.query<APIResponse<ReportDashboardData>, void>(
        {
          query: () => {
            return {
              url: `/report/dashboard`,
            };
          },
          providesTags: ['REPORT_DASHBOARD'],
        }
      ),
    };
  },
});

export const { useGetReportDashboardQuery } = extendedProductApi;
