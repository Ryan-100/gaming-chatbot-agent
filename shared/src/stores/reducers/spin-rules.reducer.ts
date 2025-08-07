import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  SpinRulesListData,
  UpdateSpinRulesForm,
} from '../../types/spin-rules.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getSpinRules: builder.query<APIResponse<SpinRulesListData[]>, void>({
        query: (payload) => {
          return {
            url: `/spin-management/spin-rule-admin`,
          };
        },
        providesTags: ['SPIN_RULES'],
      }),

      updateSpinRules: builder.mutation<
        APIResponse<UpdateSpinRulesForm>,
        { spinRules: UpdateSpinRulesForm[] }
      >({
        query: (payload) => {
          console.log('payload', payload.spinRules);

          return {
            url: `/spin-management/update-rules`,
            body: payload,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['SPIN_RULES'],
      }),
    };
  },
});

export const { useGetSpinRulesQuery, useUpdateSpinRulesMutation } =
  extendedProductApi;
