import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  DepositRecordHistoryDetailListData,
  DepositRecordHistoryListData,
} from '../../types/deposit-record.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepositRecordHistory: builder.query<
        APIResponse<DepositRecordHistoryListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          type?: string;
          time?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-management/record-history?${params}`,
          };
        },
        providesTags: ['DEPOSIT_RECORD_HISTORY'],
      }),
      getDepositRecordHistoryDetail: builder.query<
        APIResponse<DepositRecordHistoryDetailListData[]>,
        {
          digitSearch?: string;
          amountSearch?: number;
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
            url: `/deposit-management/record-history-detail?${params}`,
          };
        },
        providesTags: ['DEPOSIT_RECORD_HISTORY_DETAIL'],
      }),
    };
  },
});

export const {
  useGetDepositRecordHistoryQuery,
  useGetDepositRecordHistoryDetailQuery,
} = extendedProductApi;
