import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { ReportUserData } from '../../types/report-user.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getReportUser: builder.query<
        APIResponse<ReportUserData>,
        {
          type: string;
          time: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/report/user?${params}`,
          };
        },
        providesTags: ['REPORT_USER'],
      }),
    };
  },
});

export const { useGetReportUserQuery } = extendedProductApi;
