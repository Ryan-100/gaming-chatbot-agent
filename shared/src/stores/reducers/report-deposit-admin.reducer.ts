import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  ReportDepositAdminDetailData,
  ReportDepositAdminData,
  ReportDepositAdminTransactionData,
} from '../../types/report-deposit-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportDepositAdmin: builder.query<
        APIResponse<ReportDepositAdminData>,
        {
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/deposit-admin?${params}`,
          };
        },
        providesTags: ['REPORT_DEPOSIT_ADMIN'],
      }),
      getReportDepositAdminDetail: builder.query<
        APIResponse<ReportDepositAdminDetailData>,
        {
          id: string;
          time: string;
          word?: string;
          status: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/deposit-admin-detail/${payload.id}?${params}`,
          };
        },
        providesTags: ['REPORT_DEPOSIT_ADMIN_DETAIL'],
      }),
      getReportDepositAdminTransaction: builder.query<
        APIResponse<ReportDepositAdminTransactionData>,
        string
      >({
        query: (payload) => {
          return {
            url: `/report/deposit-transaction/${payload}`,
          };
        },
        providesTags: ['REPORT_DEPOSIT_ADMIN_TRANSACTION'],
      }),
    };
  },
});

export const {
  useGetReportDepositAdminQuery,
  useGetReportDepositAdminDetailQuery,
  useGetReportDepositAdminTransactionQuery,
} = extendedProductApi;
