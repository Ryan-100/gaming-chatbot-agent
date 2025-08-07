import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { CreateRoleForm, RoleListData } from '../../types/roles.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getRoles: builder.query<
        APIResponse<RoleListData[]>,
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
            url: `/role-and-permission/role?${params}`,
          };
        },
        providesTags: ['ROLES'],
      }),
      getCustomRoles: builder.query<APIResponse<RoleListData[]>, void>({
        query: (payload) => {
          return {
            url: `/service-admin/role`,
          };
        },
        providesTags: ['CUSTOM_ROLES'],
      }),
      getRoleDetail: builder.query<
        APIResponse<RoleListData>,
        {
          id?: string;
        }
      >({
        query: (payload) => {
          return {
            url: `/role-and-permission/role/${payload.id}`,
          };
        },
        providesTags: ['ROLE_DETAIL'],
      }),
      createRole: builder.mutation<APIResponse<RoleListData>, CreateRoleForm>({
        query: (payload) => {
          return {
            url: '/role-and-permission/create',
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ROLES', 'CUSTOM_ROLES'],
      }),
      updateRole: builder.mutation<
        APIResponse<RoleListData>,
        { id: string; data: CreateRoleForm }
      >({
        query: (payload) => {
          return {
            url: `/role-and-permission/update/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['ROLES', 'ROLE_DETAIL', 'CUSTOM_ROLES'],
      }),
      deleteRole: builder.mutation<APIResponse<RoleListData>, { id: string }>({
        query: (payload) => {
          return {
            url: `/role-and-permission/delete/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['ROLES', 'CUSTOM_ROLES'],
      }),
    };
  },
});

export const {
  useGetRolesQuery,
  useGetCustomRolesQuery,
  useGetRoleDetailQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = extendedProductApi;
