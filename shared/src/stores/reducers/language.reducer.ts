import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { LanguageData } from '../../types/language.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getLanguage: builder.query<APIResponse<LanguageData[]>, void>({
        query: () => {
          return {
            url: `/language`,
          };
        },
        providesTags: ['LANGUAGES'],
      }),
    };
  },
});

export const { useGetLanguageQuery } = extendedProductApi;
