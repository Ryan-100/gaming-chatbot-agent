import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  WithdrawReportDetailListData,
  WithdrawReportListData,
} from '../../types/withdraw-report.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getWithdrawReport: builder.query<
        APIResponse<WithdrawReportListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          month?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-management/withdraw-admin-report?${params}`,
          };
        },
        providesTags: ['WITHDRAW_REPORT'],
      }),
      getWithdrawReportDetail: builder.query<
        APIResponse<WithdrawReportDetailListData[]>,
        {
          amountSearch?: string;
          requestType?: string;
          pageIndex?: number;
          rowPerPage?: number;
          type?: string;
          time?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-management/record-detail?${params}`,
          };
        },
        providesTags: ['WITHDRAW_REPORT_DETAIL'],
      }),
    };
  },
});

export const { useGetWithdrawReportQuery, useGetWithdrawReportDetailQuery } =
  extendedProductApi;
