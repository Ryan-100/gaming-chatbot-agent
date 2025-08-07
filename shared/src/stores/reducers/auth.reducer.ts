import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import {
  LoginForm,
  MeData,
  TokenData,
  UpdateMeForm,
} from '../../types/auth.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      login: builder.mutation<APIResponse<TokenData>, LoginForm>({
        query: (payload) => {
          return {
            url: `/auth/admin/login`,
            body: payload,
            method: 'POST',
          };
        },
        invalidatesTags: ['ME'],
      }),
      getMe: builder.query<APIResponse<MeData>, void>({
        query: () => {
          return {
            url: `/auth/admin/whoami`,
          };
        },
        providesTags: ['ME'],
      }),
      updatePassword: builder.mutation<APIResponse<MeData>, UpdateMeForm>({
        query: (payload) => {
          return {
            url: `/auth/admin/change-password`,
            body: payload,
            method: 'PUT',
          };
        },
        invalidatesTags: ['ME'],
      }),
    };
  },
});

export const { useLoginMutation, useGetMeQuery, useUpdatePasswordMutation } =
  extendedProductApi;
