import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  ExchangeRateData,
  CreateExchangeRateFormWithAction,
  ExchangeCurrencyData,
} from '../../types/exchange-rete.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getExchangeCurrency: builder.query<
        APIResponse<ExchangeCurrencyData>,
        void
      >({
        query: (payload) => {
          return {
            url: `/exchange-rate/currency`,
          };
        },
        providesTags: ['EXCHANGE_CURRENCY'],
      }),
      getWithdrawRate: builder.query<
        APIResponse<{
          latestExchangeRate: ExchangeRateData;
          exchangeRateList: ExchangeRateData[];
        }>,
        {
          date?: string;
          pagination?: { pageIndex?: number; rowPerPage?: number };
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload.pagination ?? {});
          return {
            url: `/exchange-rate/withdraw/${payload.date}?${params}`,
          };
        },
        providesTags: ['EXCHANGE_RATE_WITHDRAW'],
      }),
      getDepositRate: builder.query<
        APIResponse<{
          latestExchangeRate: ExchangeRateData;
          exchangeRateList: ExchangeRateData[];
        }>,
        {
          date?: string;
          pagination?: { pageIndex?: number; rowPerPage?: number };
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload.pagination ?? {});
          return {
            url: `/exchange-rate/deposit/${payload.date}?${params}`,
          };
        },
        providesTags: ['EXCHANGE_RATE_DEPOSIT'],
      }),
      updateExchangeRate: builder.mutation<
        APIResponse<ExchangeRateData>,
        CreateExchangeRateFormWithAction
      >({
        query: (payload) => {
          return {
            url: `/exchange-rate/update`,
            body: payload,
            method: 'PATCH',
          };
        },
        invalidatesTags: [
          'EXCHANGE_RATE_WITHDRAW',
          'EXCHANGE_RATE_DEPOSIT',
          'TRANSACTIONS_WITHDRAW',
          'TRANSACTIONS_DEPOSIT',
        ],
      }),
    };
  },
});

export const {
  useGetExchangeCurrencyQuery,
  useGetWithdrawRateQuery,
  useGetDepositRateQuery,
  useUpdateExchangeRateMutation,
} = extendedProductApi;
