import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  ReportWithdrawAdminDetailData,
  ReportWithdrawAdminData,
  ReportWithdrawAdminTransactionData,
} from '../../types/report-withdraw-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportWithdrawAdmin: builder.query<
        APIResponse<ReportWithdrawAdminData>,
        {
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/withdraw-admin?${params}`,
          };
        },
        providesTags: ['REPORT_WITHDRAW_ADMIN'],
      }),
      getReportWithdrawAdminDetail: builder.query<
        APIResponse<ReportWithdrawAdminDetailData>,
        {
          id: string;
          time: string;
          amount?: string;
          status: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/withdraw-admin-detail/${payload.id}?${params}`,
          };
        },
        providesTags: ['REPORT_WITHDRAW_ADMIN_DETAIL'],
      }),
      getReportWithdrawAdminTransaction: builder.query<
        APIResponse<ReportWithdrawAdminTransactionData>,
        string
      >({
        query: (payload) => {
          return {
            url: `/report/withdraw-transaction/${payload}`,
          };
        },
        providesTags: ['REPORT_WITHDRAW_ADMIN_TRANSACTION'],
      }),
    };
  },
});

export const {
  useGetReportWithdrawAdminQuery,
  useGetReportWithdrawAdminDetailQuery,
  useGetReportWithdrawAdminTransactionQuery,
} = extendedProductApi;
