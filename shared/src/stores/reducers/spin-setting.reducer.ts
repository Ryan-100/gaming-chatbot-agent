import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  SpinSettingData,
  UpdateSpinSettingForm,
} from '../../types/spin-setting.types';


const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSpinSetting: builder.query<
      APIResponse<SpinSettingData>,
      void
    >({
        query: () => {
          return {
            url: `/spin-management/spin-setting`,
          };
        },
        providesTags: ['SPIN_SETTING'],
      }),

      updateSpinSetting: builder.mutation<
        APIResponse<UpdateSpinSettingForm>,
        { data: UpdateSpinSettingForm }
      >({
        query: (payload) => {
          return {
            url: `/spin-management/update-setting`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SPIN_SETTING'],
      }),
    };
  },
});

export const {
  useGetSpinSettingQuery,
  useUpdateSpinSettingMutation,
} = extendedProductApi;
