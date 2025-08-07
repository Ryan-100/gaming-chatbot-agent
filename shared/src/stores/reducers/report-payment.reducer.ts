import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ReportPaymentData } from '../../types/report-payment.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportPayment: builder.query<
        APIResponse<ReportPaymentData>,
        {
          type: string;
          time: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/payment?${params}`,
          };
        },
        providesTags: ['REPORT_PAYMENT'],
      }),
    };
  },
});

export const { useGetReportPaymentQuery } = extendedProductApi;
