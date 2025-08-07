import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { WithdrawDashboardData } from '../../types/withdraw-dashboard.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWithdrawDashboard: builder.query<
        APIResponse<WithdrawDashboardData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/withdraw-management/withdraw-admin-dashboard`,
          };
        },
        providesTags: ['WITHDRAW_DASHBOARD'],
      }),
    };
  },
});

export const { useGetWithdrawDashboardQuery } = extendedProductApi;
