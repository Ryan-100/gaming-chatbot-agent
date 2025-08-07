import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { SpinMaintainData } from '../../types/spin-maintain.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSpinMaintenance: builder.query<
        APIResponse<SpinMaintainData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `spin-management/spin-maintenance-admin`,
          };
        },
        providesTags: ['SPIN_MAINTAIN'],
      }),

      updateSpinMaintenance: builder.mutation<
        APIResponse<SpinMaintainData>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `spin-management/spin-maintenance-admin`,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SPIN_MAINTAIN'],
      }),
    };
  },
});

export const {
  useGetSpinMaintenanceQuery,
  useUpdateSpinMaintenanceMutation,
} = extendedProductApi;
