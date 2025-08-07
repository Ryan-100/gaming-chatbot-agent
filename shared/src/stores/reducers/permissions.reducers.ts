import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { PermissionListData } from '../../types/permissions.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getPermissions: builder.query<APIResponse<PermissionListData[]>, void>({
        query: (payload) => {
          return {
            url: `/role-and-permission/permissions`,
          };
        },
        providesTags: ['PERMISSIONS'],
      }),
      createPermission: builder.mutation<
        APIResponse<void>,
        { name: string; route: string }
      >({
        query: (payload) => {
          return {
            url: `/role-and-permission/permission/create`,
            body: payload,
            method: 'POST',
          };
        },
      }),
    };
  },
});

export const { useGetPermissionsQuery, useCreatePermissionMutation } =
  extendedProductApi;
