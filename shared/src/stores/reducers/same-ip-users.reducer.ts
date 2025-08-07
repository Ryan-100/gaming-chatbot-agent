import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { objectToQueryString } from '../../utils/objectToQueryString';
import { SameIpUsersByPlayerListData } from '../../types/same-ip-users.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSameIpUsersByPlayer: builder.query<
        APIResponse<SameIpUsersByPlayerListData[]>,
        {
          id: string;
          pageIndex: number;
          rowPerPage: number;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/withdraw-management/same-ip-users/${payload.id}?${params}`,
          };
        },
        providesTags: ['SAME_IP_USERS'],
      }),
    };
  },
});

export const { useGetSameIpUsersByPlayerQuery } = extendedProductApi;
