import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  LegalListData,
  UpdateLegalForm,
  CreateLegalForm,
} from '../../types/legal.types';
import { objectToQueryString } from '../../utils/objectToQueryString';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getLegal: builder.query<APIResponse<LegalListData[]>, { type: string }>({
        query: (payload) => {
          const params = objectToQueryString(payload);
          return {
            url: `legal?${params}`,
          };
        },
        providesTags: ['LEGAL'],
      }),
      createLegal: builder.mutation<
        APIResponse<CreateLegalForm>,
        { data: CreateLegalForm }
      >({
        query: (payload) => {
          return {
            url: `legal/create`,
            body: payload.data,
            method: 'POST',
          };
        },
        invalidatesTags: ['LEGAL'],
      }),
      updateLegal: builder.mutation<
        APIResponse<UpdateLegalForm>,
        { data: UpdateLegalForm }
      >({
        query: (payload) => {
          return {
            url: `legal/update`,
            body: payload.data,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['LEGAL'],
      }),
    };
  },
});

export const {
  useGetLegalQuery,
  useCreateLegalMutation,
  useUpdateLegalMutation,
} = extendedProductApi;
