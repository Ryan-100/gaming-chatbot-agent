import { apiSlice } from '../api.slice';
import { APIResponse } from '../../types/base.types';
import { GuideListData, UpdateGuideFrom } from '../../types/guide.types';

const extendedProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDownloadGuide: builder.query<
        APIResponse<GuideListData[]>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/guide?type=DOWNLOAD`,
          };
        },
        providesTags: ['DOWNLOAD_GUIDE'],
      }),
      getLoginGuide: builder.query<
        APIResponse<GuideListData[]>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/guide?type=LOGIN`,
          };
        },
        providesTags: ['LOGIN_GUIDE'],
      }),
      getRegisterGuide: builder.query<
        APIResponse<GuideListData[]>,
        Record<string, never>
      >({
        query: () => {
          return {
            url: `/guide?type=REGISTER`,
          };
        },
        providesTags: ['REGISTER_GUIDE'],
      }),
      updateGuide: builder.mutation<
        APIResponse<UpdateGuideFrom>,
        { guides: UpdateGuideFrom[] }
      >({
        query: (payload) => {
          return {
            url: `/guide/update`,
            body: payload,
            method: 'PATCH',
          };
        },
        invalidatesTags: ['DOWNLOAD_GUIDE', 'LOGIN_GUIDE', 'REGISTER_GUIDE'],
      }),
    };
  },
});

export const {
  useGetDownloadGuideQuery,
  useGetLoginGuideQuery,
  useGetRegisterGuideQuery,
  useUpdateGuideMutation,
} = extendedProductApi;
