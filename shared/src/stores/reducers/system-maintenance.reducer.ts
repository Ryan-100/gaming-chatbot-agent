import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { SystemMaintenanceData } from '../../types/system-maintenance.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSystemMaintenance: builder.query<
        APIResponse<SystemMaintenanceData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/setting/get-system-maintenance`,
          };
        },
        providesTags: ['SYSTEM_MAINTENANCE'],
      }),
      updateSystemMaintenance: builder.mutation<
        APIResponse<SystemMaintenanceData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/setting/update-system-maintenance`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SYSTEM_MAINTENANCE'],
      }),
    };
  },
});

export const {
  useGetSystemMaintenanceQuery,
  useUpdateSystemMaintenanceMutation,
} = extendedProductApi;
