import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateDepositDashboardDigitForm,
  DepositDashboardDetailTableData,
  DepositDashboardRequestListData,
} from '../../types/deposit-dashboard.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepositDashboardDetailTable: builder.query<
        APIResponse<DepositDashboardDetailTableData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/deposit-management/admin-detail-table`,
          };
        },
        providesTags: ['DEPOSIT_DASHBOARD_DETAIL_TABLE'],
      }),
      getDepositDashboardRequests: builder.query<
        APIResponse<DepositDashboardRequestListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          amount?: number;
          digit?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-management/dashboard-requests?${params}`,
          };
        },
        providesTags: ['DEPOSIT_DASHBOARD_REQUESTS'],
      }),
      createDepositDashboardDigit: builder.mutation<
        APIResponse<DepositDashboardRequestListData>,
        CreateDepositDashboardDigitForm
      >({
        query: (payload) => {
          return {
            url: '/deposit-management/dashboard-accept-digit',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['DEPOSIT_DASHBOARD_REQUESTS'],
      }),
    };
  },
});

export const {
  useGetDepositDashboardDetailTableQuery,
  useGetDepositDashboardRequestsQuery,
  useCreateDepositDashboardDigitMutation,
} = extendedProductApi;
