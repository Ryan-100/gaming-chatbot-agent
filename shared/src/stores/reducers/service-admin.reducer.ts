import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  CreateServiceAdminForm,
  UpdateServiceAdminForm,
  ServiceAdminListData,
} from '../../types/service-admin.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getServiceAdmin: builder.query<
        APIResponse<ServiceAdminListData[]>,
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
            url: `/service-admin?adminType=SERVICE_ADMIN&${params}`,
          };
        },
        providesTags: ['SERVICE_ADMIN'],
      }),
      getServiceAdminDetail: builder.query<
        APIResponse<ServiceAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/${payload.id}`,
          };
        },
        providesTags: ['SERVICE_ADMIN_DETAIL'],
      }),

      createServiceAdmin: builder.mutation<
        APIResponse<ServiceAdminListData>,
        CreateServiceAdminForm
      >({
        query: (payload) => {
          return {
            url: '/service-admin/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['SERVICE_ADMIN'],
      }),

      updateServiceAdmin: builder.mutation<
        APIResponse<ServiceAdminListData>,
        { id: string; data: UpdateServiceAdminForm }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SERVICE_ADMIN', 'SERVICE_ADMIN_DETAIL'],
      }),
      deleteServiceAdmin: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/service-admin/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['SERVICE_ADMIN'],
      }),
      changeStatusServiceAdmin: builder.mutation<
        APIResponse<ServiceAdminListData>,
        { id: string }
      >({
        query: (payload) => {
          return {
            url: `/service-admin/change-status/${payload.id}`,
            method: 'POST',
          };
        },
        invalidatesTags: ['SERVICE_ADMIN_DETAIL', 'SERVICE_ADMIN'],
      }),
    };
  },
});

export const {
  useGetServiceAdminQuery,
  useGetServiceAdminDetailQuery,
  useCreateServiceAdminMutation,
  useUpdateServiceAdminMutation,
  useDeleteServiceAdminMutation,
  useChangeStatusServiceAdminMutation,
} = extendedProductApi;
