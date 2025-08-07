import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateCustomAdminForm,
  UpdateCustomAdminForm,
  CustomAdminListData,
} from '../../types/custom-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getCustomAdmin: builder.query<
        APIResponse<CustomAdminListData[]>,
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
            url: `/service-admin?adminType=CUSTOM_ADMIN&${params}`,
          };
        },
        providesTags: ['CUSTOM_ADMIN'],
      }),
      getCustomAdminDetail: builder.query<
        APIResponse<CustomAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/${payload.id}`,
          };
        },
        providesTags: ['CUSTOM_ADMIN_DETAIL'],
      }),

      createCustomAdmin: builder.mutation<
        APIResponse<CustomAdminListData>,
        CreateCustomAdminForm
      >({
        query: (payload) => {
          return {
            url: '/service-admin/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['CUSTOM_ADMIN'],
      }),

      updateCustomAdmin: builder.mutation<
        APIResponse<CustomAdminListData>,
        { id: string; data: UpdateCustomAdminForm }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['CUSTOM_ADMIN', 'CUSTOM_ADMIN_DETAIL'],
      }),
      deleteCustomAdmin: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/service-admin/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['CUSTOM_ADMIN'],
      }),
      changeStatusCustomAdmin: builder.mutation<
        APIResponse<CustomAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/change-status/${payload.id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['CUSTOM_ADMIN_DETAIL', 'CUSTOM_ADMIN'],
      }),
    };
  },
});

export const {
  useGetCustomAdminQuery,
  useGetCustomAdminDetailQuery,
  useCreateCustomAdminMutation,
  useUpdateCustomAdminMutation,
  useDeleteCustomAdminMutation,
  useChangeStatusCustomAdminMutation,
} = extendedProductApi;
