import { apiSlice } from '../api.slice';
import {
  CreateSpinBonusForm,
  SpinBonusListData,
  UpdateSpinBonusForm,
} from '../../types/spin-bonus.types';
// import { objectToQueryString } from '../../utils/objectToQueryString';
import { APIResponse } from '../../types/base.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSpinBonusList: builder.query<
        APIResponse<SpinBonusListData[]>,
        void
      >({
        query: (payload) => {
          // const params = objectToQueryString(payload);
          return {
            url: `/spin-management/get-item`,
          };
        },
        providesTags: ['SPIN_BONUS'],
      }),

      createSpinBonus: builder.mutation<
        APIResponse<SpinBonusListData>,
        CreateSpinBonusForm
      >({
        query: (payload) => {
          return {
            url: `/spin-management/create-item`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['SPIN_BONUS'],
      }),

      updateSpinBonus: builder.mutation<
        APIResponse<void>,
        { id: string; data: UpdateSpinBonusForm }
      >({
        query: (payload) => {
          return {
            url: `/spin-management/update-item/${payload.id}`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SPIN_BONUS'],
      }),

      deleteSpinBonus: builder.mutation<APIResponse<void>, { id: string }>({
        query: (payload) => {
          return {
            url: `/spin-management/delete-item/${payload.id}`,
            method: 'DELETE',
          };
        },
        invalidatesTags: ['SPIN_BONUS'],
      }),
    };
  },
});

export const {
  useGetSpinBonusListQuery,
  useCreateSpinBonusMutation,
  useUpdateSpinBonusMutation,
  useDeleteSpinBonusMutation,
} = extendedProductApi;
