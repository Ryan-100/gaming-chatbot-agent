import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateDepositAdminForm,
  DepositAdminListData,
  UpdateDepositAdminForm,
} from '../../types/deposit-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDepositAdmin: builder.query<
        APIResponse<DepositAdminListData[]>,
        {
          pageIndex?: number;
          rowPerPage?: number;
          word?: string;
          status?: string;
        }
      >({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `/deposit-admin?${params}`,
          };
        },
        providesTags: ['DEPOSIT_ADMIN'],
      }),
      getDepositAdminDetail: builder.query<
        APIResponse<DepositAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/deposit-admin/${payload.id}`,
          };
        },
        providesTags: ['DEPOSIT_ADMIN_DETAIL'],
      }),
      createDepositAdmin: builder.mutation<
        APIResponse<DepositAdminListData>,
        CreateDepositAdminForm
      >({
        query: (payload) => {
          return {
            url: '/deposit-admin/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['DEPOSIT_ADMIN'],
      }),
      updateDepositAdmin: builder.mutation<
        APIResponse<DepositAdminListData>,
        { id: string; data: UpdateDepositAdminForm }
      >({
        query: (payload) => {
          return {
            url: `/deposit-admin/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['DEPOSIT_ADMIN', 'DEPOSIT_ADMIN_DETAIL'],
      }),
      deleteDepositAdmin: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/deposit-admin/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['DEPOSIT_ADMIN'],
      }),
    };
  },
});

export const {
  useGetDepositAdminQuery,
  useCreateDepositAdminMutation,
  useUpdateDepositAdminMutation,
} = extendedProductApi;
