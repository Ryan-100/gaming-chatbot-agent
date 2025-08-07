import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  DepositAccountListData,
  ReportCryptoByCategoryData,
  ReportCryptoData,
  WithdrawAccountListData,
} from '../../types/report-crypto.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportCrypto: builder.query<
        APIResponse<ReportCryptoData>,
        {
          type: string;
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/crypto?${params}`,
          };
        },
        providesTags: ['REPORT_CRYPTO'],
      }),
      getReportCryptoByCategory: builder.query<
        APIResponse<ReportCryptoByCategoryData>,
        {
          id: string;
          type: string;
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/crypto/category/${payload.id}?${params}`,
          };
        },
        providesTags: ['REPORT_CRYPTO_CATEGORY'],
      }),
      getDepositAccount: builder.query<
        APIResponse<DepositAccountListData[]>,
        {
          id: string;
          type: string;
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/crypto/deposit-account/${payload.id}?${params}`,
          };
        },
        providesTags: ['REPORT_CRYPTO_DEPOSIT_ACCOUNT'],
      }),
      getWithdrawAccount: builder.query<
        APIResponse<WithdrawAccountListData[]>,
        {
          id: string;
          type: string;
          time: string;
          pageIndex?: number;
          rowPerPage?: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/crypto/withdraw-account/${payload.id}?${params}`,
          };
        },
        providesTags: ['REPORT_CRYPTO_WITHDRAW_ACCOUNT'],
      }),
    };
  },
});

export const {
  useGetReportCryptoQuery,
  useGetReportCryptoByCategoryQuery,
  useGetDepositAccountQuery,
  useGetWithdrawAccountQuery,
} = extendedProductApi;
